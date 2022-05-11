import { Axios } from "axios";

class IEXClient {
  private axios: Axios;

  constructor() {
    this.axios = new Axios({
      baseURL: "https://cloud.iexapis.com/stable",
      params: {
        token: process.env.REACT_APP_IEX_TOKEN,
      },
    });
  }

  public getHistoricalPrices = async (symbol: string) => {
    return this.axios.get(`/stock/${symbol}/chart/1y?chartCloseOnly=true`);
  };

  public getTopMarketCap = async () => {
    return await this.axios.get("/stock/market/list/mostactive");
  };

  public getQuote = async (symbol: string) => {
    return await this.axios.get(`/stock/${symbol}/quote`);
  };

  public getCompany = async (symbol: string) => {
    return await this.axios.get(`/stock/${symbol}/company`);
  };
}

export default IEXClient;
