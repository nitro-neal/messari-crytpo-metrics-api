import MetricsResponse from "../models/MetricsResponse";
import AggregateResponse from "../models/AggregateResponse";
import TagResponse from "../models/TagResponse";
import SectorResponse from "../models/SectorResponse";

import APIService from "./APIService";
import * as assets from "../assets.json";

const AGGREGATE_MARKETCAP_LIMIT = 20000000;

class MetricsService extends APIService {
  static async getTags(): Promise<TagResponse> {
    // const rawResponse = await super.get(
    //   `https://data.messari.io/api/v2/assets?with-metrics&with-profiles&limit=500`
    // );

    const rawResponse = assets;

    const tags: Set<string> = new Set();

    for (const coinData of rawResponse.data) {
      if (
        coinData.profile.general.overview.tags &&
        !tags.has(coinData.profile.general.overview.tags)
      ) {
        tags.add(coinData.profile.general.overview.tags);
      }
    }

    const tagsResponse: TagResponse = {
      tags: Array.from(tags),
    };

    return tagsResponse;
  }

  static async getSectors(): Promise<SectorResponse> {
    // const rawResponse = await super.get(
    //   `https://data.messari.io/api/v2/assets?with-metrics&with-profiles&limit=500`
    // );

    const rawResponse = assets;

    const sectors: Set<string> = new Set();

    for (const coinData of rawResponse.data) {
      if (
        coinData.profile.general.overview.sector &&
        !sectors.has(coinData.profile.general.overview.sector)
      ) {
        sectors.add(coinData.profile.general.overview.sector);
      }
    }

    const sectorsResponse: SectorResponse = {
      sectors: Array.from(sectors),
    };

    return sectorsResponse;
  }

  static async getCoinMetrics(coin: string): Promise<MetricsResponse> {
    const rawResponse = await super.get(
      `https://data.messari.io/api/v1/assets/${coin}/metrics`
    );

    const rawNewsResponse = await super.get(
      `https://data.messari.io/api/v1/news/${coin}`
    );

    const market_data = rawResponse.data.market_data;
    const marketcap_data = rawResponse.data.marketcap;

    let newsTitle;
    let newsContent;
    if (rawNewsResponse.data && rawNewsResponse.data[0]) {
      newsTitle = rawNewsResponse.data[0].title;
      newsContent = rawNewsResponse.data[0].content;
    }

    const metricsResponse: MetricsResponse = {
      symbol: rawResponse.data.symbol,
      name: rawResponse.data.name,
      price_usd: market_data.price_usd,
      volume_last_24_hours: market_data.volume_last_24_hours,
      current_marketcap_usd: marketcap_data.current_marketcap_usd,
      latest_news_title: newsTitle,
      latest_news_content: newsContent,
    };

    return metricsResponse;
  }

  static async getAggregateMetrics(
    tags: string[],
    sectors: string[]
  ): Promise<AggregateResponse> {
    // const rawResponse = await super.get(
    //   `https://data.messari.io/api/v2/assets?with-metrics&with-profiles&limit=500`
    // );

    const rawResponse = assets;

    if (tags) {
      return MetricsService.aggregateBy(rawResponse, "tag", tags);
    } else if (sectors) {
      return MetricsService.aggregateBy(rawResponse, "sector", sectors);
    } else {
      return MetricsService.aggregateBy(rawResponse, "default", []);
    }
  }

  private static aggregateBy(
    rawResponse: any,
    aggregateType: string,
    tagOrSectors: string[]
  ) {
    let aggregateMarketCap = 0;
    let aggregateVolume = 0;
    const metricsResponses: MetricsResponse[] = [];

    for (const coinData of rawResponse.data) {
      if (
        MetricsService.shouldAggregate(coinData, aggregateType, tagOrSectors)
      ) {
        aggregateMarketCap += coinData.metrics.marketcap.current_marketcap_usd;
        aggregateVolume += coinData.metrics.market_data.volume_last_24_hours;

        const metricsResponse: MetricsResponse = {
          symbol: coinData.symbol,
          name: coinData.name,
          price_usd: coinData.metrics.market_data.price_usd,
          volume_last_24_hours:
            coinData.metrics.market_data.volume_last_24_hours,
          current_marketcap_usd:
            coinData.metrics.marketcap.current_marketcap_usd,
          tag: coinData.profile.general.overview.tags,
          sector: coinData.profile.general.overview.sector,
        };

        metricsResponses.push(metricsResponse);
      }
    }

    const aggregateResponse: AggregateResponse = {
      type: aggregateType,
      aggregate_market_cap: aggregateMarketCap,
      aggregate_volume_last_24_hours: aggregateVolume,
      coins: metricsResponses,
    };

    return aggregateResponse;
  }

  private static shouldAggregate(
    coinData: any,
    aggregateType: string,
    tagOrSectors: string[]
  ) {
    if (
      aggregateType === "default" &&
      coinData.metrics.marketcap.current_marketcap_usd >=
        AGGREGATE_MARKETCAP_LIMIT
    ) {
      return true;
    }

    if (
      aggregateType === "tag" &&
      coinData.profile.general.overview.tags &&
      tagOrSectors.includes(
        coinData.profile.general.overview.tags.toLowerCase()
      )
    ) {
      return true;
    }

    if (
      aggregateType === "sector" &&
      coinData.profile.general.overview.sector &&
      tagOrSectors.includes(
        coinData.profile.general.overview.sector.toLowerCase()
      )
    ) {
      return true;
    }

    return false;
  }
}

export default MetricsService;
