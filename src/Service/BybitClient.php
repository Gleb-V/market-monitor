<?php
namespace App\Service;

use Symfony\Contracts\HttpClient\HttpClientInterface;

final class BybitClient
{
  public function __construct(private readonly HttpClientInterface $http) {}

  /**
   * Kline (история свечей) Bybit v5.
   * $category: 'spot' | 'linear' | 'inverse'
   * $interval: '1','3','5','15','30','60','120','240','360','720','D','W','M'
   * Возвращает массив массивов result.list (сырой формат Bybit).
   */
  public function getKlines(
    string $symbol,
    string $interval = '1',
    string $category = 'inverse',
    int $limit = 500,
    ?int $startMs = null,
    ?int $endMs   = null
  ): array {
    $query = array_filter([
      'category' => $category,
      'symbol'   => strtoupper($symbol),
      'interval' => $interval,
      'limit'    => $limit,
      'start'    => $startMs,
      'end'      => $endMs,
    ], fn($v) => $v !== null);

    $resp = $this->http->request('GET', 'https://api.bybit.com/v5/market/kline', ['query' => $query]);
    $json = $resp->toArray(false);

    if (($json['retCode'] ?? -1) !== 0) {
      $msg = $json['retMsg'] ?? 'unknown';
      throw new \RuntimeException("Bybit error: {$msg}");
    }
    return $json['result']['list'] ?? [];
  }
}
