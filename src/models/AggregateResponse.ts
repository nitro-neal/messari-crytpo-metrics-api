import MetricsResponse from "./MetricsResponse";

interface AggregateResponse {
  type: string;
  aggregate_market_cap: number;
  aggregate_volume_last_24_hours: number;
  dominance_vs_global?: number;
  coins: MetricsResponse[];
}

export default AggregateResponse;
