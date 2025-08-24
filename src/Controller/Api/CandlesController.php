<?php
namespace App\Controller\Api;

use Doctrine\DBAL\Connection;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;

#[Route('/api')]
final class CandlesController
{
  public function __construct(private readonly Connection $db) {}

  #[Route('/candles', name: 'api_candles', methods: ['GET'])]
  public function candles(Request $req): JsonResponse
  {
    $exchange = $req->query->get('exchange', 'bybit');
    $symbol   = strtoupper((string)$req->query->get('symbol', 'BTCUSD')); // нативный символ для bybit inverse
    $interval = (string)$req->query->get('interval', '1');
    $limit    = (int)$req->query->get('limit', 500);

    $exId = (int)$this->db->fetchOne('SELECT id FROM exchanges WHERE code=?', [$exchange]);
    if (!$exId) return new JsonResponse(['candles'=>[]], 200);

    $mktId = (int)$this->db->fetchOne(
      'SELECT id FROM markets WHERE exchange_id=? AND symbol_native=?',
      [$exId, $symbol]
    );
    if (!$mktId) return new JsonResponse(['candles'=>[]], 200);

    $rows = $this->db->fetchAllAssociative(
      "SELECT open_time, open, high, low, close, volume, closed
             FROM candles
             WHERE exchange_id=? AND market_id=? AND interval=?
             ORDER BY open_time DESC
             LIMIT ?",
      [$exId, $mktId, $interval, $limit]
    );

    $rows = array_reverse($rows);
    $data = array_map(static fn($r) => [
      't' => (new \DateTimeImmutable($r['open_time']))->getTimestamp() * 1000,
      'o' => (float)$r['open'],
      'h' => (float)$r['high'],
      'l' => (float)$r['low'],
      'c' => (float)$r['close'],
      'v' => (float)$r['volume'],
      'closed' => (bool)$r['closed'],
    ], $rows);

    return new JsonResponse(['candles' => $data]);
  }
}
