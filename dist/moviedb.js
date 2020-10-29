class MovieDB {
  async getMovie() {
    const headerResponse = await fetch("./config.json");
    const header = await headerResponse.json();
  }
}
