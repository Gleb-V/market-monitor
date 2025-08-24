<?php
namespace App\Command;

use App\Service\BybitClient;
use Doctrine\DBAL\Connection;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

#[AsCommand(name: 'app:ingest:bybit', description: 'Загрузить свечи Bybit в БД')]
final class IngestBybitCommand extends Command
{
  public function __construct(
    private readonly BybitClient $bybit,
    private readonly Connection $db,
  ) { parent::__construct(); }

  protected function configure(): void
  {
    $this
      ->addArgument('symbol', InputArgument::REQUIRED, 'Напр. BTCUSD или BTCUSDT')
      ->addOption('category', null, InputOption::VALUE_REQUIRED, 'spot|linear|inverse', 'inverse')
      ->addOption('interval', null, InputOption::VALUE_REQUIRED, '1|3|5|15|30|60|120|240|360|720|D|W|M', '1')
      ->addOption('limit', null, InputOption::VALUE_REQUIRED, 'кол-во свечей', '500');
  }

  protected function execute(InputInterface $in, OutputInterface $out): int
  {
    $symbol   = strtoupper((string)$in->getArgument('symbol'));
    $category = (string)$in->getOption('category');
    $interval = (string)$in->getOption('interval');
    $limit    = (int)$in->getOption('limit');

    // id биржи Bybit
    $exId = (int)$this->db->fetchOne('SELECT id FROM exchanges WHERE code=?', ['bybit']);
    if (!$exId) { $out->writeln('<error>exchanges.bybit не найден</error>'); return Command::FAILURE; }

    // находим рынок по нативному символу
    $mktId = (int)$this->db->fetchOne(
      'SELECT id FROM markets WHERE exchange_id=? AND symbol_native=?',
      [$exId, $symbol]
    );
    if (!$mktId) {
      $out->writeln("<error>market {$symbol} для bybit не найден (добавь в markets)</error>");
      return Command::FAILURE;
    }

    // получаем свечи
    $list = $this->bybit->getKlines($symbol, $interval, $category, $limit);

    // Bybit v5 kline list: [ startTimeMs, open, high, low, close, volume, turnover ]
    $this->db->beginTransaction();
    try {
      foreach ($list as $k) {
        $openTimeMs = (int)$k[0];
        $row = [
          'exchange_id' => $exId,
          'market_id'   => $mktId,
          'interval'    => $interval,
          'open_time'   => gmdate('Y-m-d H:i:s', (int) floor($openTimeMs / 1000)),
          'open'        => $k[1],
          'high'        => $k[2],
          'low'         => $k[3],
          'close'       => $k[4],
          'volume'      => $k[5],  // объём в базовой валюте
          'closed'      => true,
        ];

        $this->db->executeStatement(
          "INSERT INTO candles(exchange_id, market_id, interval, open_time, open, high, low, close, volume, closed, received_at)
                     VALUES (:exchange_id, :market_id, :interval, :open_time, :open, :high, :low, :close, :volume, :closed, NOW())
                     ON CONFLICT (exchange_id, market_id, interval, open_time) DO UPDATE
                     SET open=:open, high=:high, low=:low, close=:close, volume=:volume, closed=:closed, received_at=NOW()",
          $row
        );
      }
      $this->db->commit();
    } catch (\Throwable $e) {
      $this->db->rollBack();
      throw $e;
    }

    $out->writeln(sprintf('Upserted %d candles: bybit %s %s (%s)',
      \count($list), $symbol, $interval, $category
    ));
    return Command::SUCCESS;
  }
}

