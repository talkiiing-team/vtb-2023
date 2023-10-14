class GeoService {
  status: string | undefined


  report(state: string) {
    this.status = state
  }

  handlePermission() {
    return new Promise<GeolocationPosition>((res, rej) =>
    navigator.permissions.query({ name: "geolocation" }).then((result) => {
      if (result.state === "granted") {
        console.log('geo grant')
        this.report(result.state);
      } else if (result.state === "prompt") {
        console.log('geo prompt')
        this.report(result.state);
      } else if (result.state === "denied") {
        console.log('geo denied')
        this.report(result.state);
      }
      result.addEventListener("change", () => {
        this.report(result.state);
      });

      navigator.geolocation.getCurrentPosition(
        (p) => res(p),
        (reason) => rej(reason.message),
        { enableHighAccuracy: true, maximumAge: 15_000, timeout: 15_000 },
      );
    }))
  }

  watchPosition() {

  }
}

export const geoService = new GeoService()
