/* eslint-disable react-native/no-inline-styles */
import * as React from 'react'
import {
  Alert,
  AlertButton,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native'
import MapwizeMap, {
  CreateMapwizeAPI,
  MapwizeViewRef,
  MapwizeConfiguration,
  Place,
  MapwizeApi,
  Direction,
  DirectionMode,
  Placelist,
  SearchParams,
  MapwizeObject,
  Venue,
  Universe,
  MapOptions,
  PlacePreview,
  Style,
  ClickEvent,
  Floor,
  MarkerProp,
  DirectionProp,
  DirectionOptions,
  NavigationProp,
  NavigationInfo,
  LatLngFloor,
  PlaceStyleProp,
} from 'mapwize-sdk-react-native'
const timeBetweenAutomaticTests = 3000
const mapwizeConfiguration: MapwizeConfiguration = new MapwizeConfiguration(
  'MapwizeDevAPIKEY'
)
const mapwizeApi: MapwizeApi = CreateMapwizeAPI(mapwizeConfiguration)
const venueId = '56b20714c3fa800b00d8f0b5'
const placeId = '5bc49413bf0ed600114db1f0'

const mapOptions: MapOptions = new MapOptions()
  .setCenterOnVenueId(venueId)
  .setRestrictContentToVenueIds([venueId])
  .setTilt(45)
  .setBearing(237)
  .setCompassEnabled(false)

interface IState {
  selectedPlace: Place | PlacePreview | undefined
  promotedPlaces: (Place | PlacePreview | Placelist)[] | undefined
  strongRef: MapwizeViewRef | undefined
  tests: any
  directionProp: DirectionProp | undefined
  markersProp: MarkerProp[] | undefined
  navigationProp: NavigationProp | undefined
  userLocation: LatLngFloor | undefined
  placeStyles: PlaceStyleProp[] | undefined
  navigationEvent: string
  navigationEventInfo: NavigationInfo
  venueExit: Venue | undefined
  venueEnter: Venue | undefined
  universe: Universe | undefined
  floor: Floor
  language: string
}
interface IProps {}
export default class TestApi extends React.PureComponent<IProps, IState> {
  centerOnPlaceTest = (resolve: (data: any) => void, reject: () => void) => {
    const searchParams = new SearchParams('Mapwize').setObjectClasses(['place'])
    mapwizeApi.search(searchParams).then(
      (mapwizeObjects: MapwizeObject[]) => {
        mapwizeApi.getPlace(mapwizeObjects[0]._id).then(
          (place: Place) => {
            this.state.strongRef?.centerOn(place)
            resolve(place)
          },
          (error) => {
            showAlert("Can't get place", error.message, reject)
          }
        )
      },
      (error) => {
        showAlert('search1', error.message, reject)
      }
    )
  }
  centerOnPlaceZoomTest = (
    resolve: (data: any) => void,
    reject: () => void
  ) => {
    const searchParams = new SearchParams('Mapwize').setObjectClasses(['place'])
    mapwizeApi.search(searchParams).then(
      (mapwizeObjects: MapwizeObject[]) => {
        mapwizeApi.getPlace(mapwizeObjects[0]._id).then(
          (place: Place) => {
            this.state.strongRef?.centerOn(place, 22)
            resolve(place)
          },
          (error) => {
            showAlert("Can't get place", error.message, reject)
          }
        )
      },
      (error) => {
        showAlert('search1', error.message, reject)
      }
    )
  }
  centerOnPlaceZoomAnimateTest = (
    resolve: (data: any) => void,
    reject: () => void
  ) => {
    const searchParams = new SearchParams('Mapwize').setObjectClasses(['place'])
    mapwizeApi.search(searchParams).then(
      (mapwizeObjects: MapwizeObject[]) => {
        mapwizeApi.getPlace(mapwizeObjects[0]._id).then(
          (place: Place) => {
            this.state.strongRef?.centerOn(place, 22, true)
            resolve(place)
          },
          (error) => {
            showAlert("Can't get place", error.message, reject)
          }
        )
      },
      (error) => {
        showAlert('search1', error.message, reject)
      }
    )
  }
  getDirectionModesTest = (
    resolve: (data: any) => void,
    reject: () => void
  ) => {
    this.state.strongRef?.getDirectionModes().then(
      (modes) => {
        showAlert('Got Direction Modes', modes, resolve)
      },
      (error) => {
        showAlert("Can't get modes", error.message, reject)
      }
    )
  }
  centerOnVenueTest = (resolve: (data: any) => void, reject: () => void) => {
    mapwizeApi.getVenue(venueId).then(
      (venue: Venue) => {
        this.state.strongRef?.centerOn(venue)
        resolve(venue)
      },
      (error) => {
        showAlert("Can't get place", error.message, reject)
      }
    )
  }
  centerOnVenueZoomOutTest = (
    resolve: (data: any) => void,
    reject: () => void
  ) => {
    mapwizeApi.getVenue(venueId).then(
      (venue: Venue) => {
        this.state.strongRef?.centerOn(venue, 13)
        resolve(venue)
      },
      (error) => {
        showAlert("Can't get place", error.message, reject)
      }
    )
  }
  centerOnVenueZoomAnimateTest = (
    resolve: (data: any) => void,
    reject: () => void
  ) => {
    mapwizeApi.getVenue(venueId).then(
      (venue: Venue) => {
        this.state.strongRef?.centerOn(venue, 19, true)
        resolve(venue)
      },
      (error) => {
        showAlert("Can't get place", error.message, reject)
      }
    )
  }
  setFloor0Test = (resolve: (data: any) => void) => {
    this.state.strongRef?.setFloor(0)
    resolve(true)
  }
  setFloor1Test = (resolve: (data: any) => void) => {
    this.state.strongRef?.setFloor(1)
    resolve(true)
  }
  setFloor2Test = (resolve: (data: any) => void) => {
    this.state.strongRef?.setFloor(2)
    resolve(true)
  }
  setFloor3Test = (resolve: (data: any) => void) => {
    this.state.strongRef?.setFloor(3)
    resolve(true)
  }
  setFloor_1Test = (resolve: (data: any) => void) => {
    this.state.strongRef?.setFloor(-1)
    resolve(true)
  }
  getFloorTest = (
    resolve: (data: any) => void,
    reject: (data: any) => void
  ) => {
    this.state.strongRef?.getFloor().then(
      (floor: Floor) => {
        showAlert('Got Floor', floor, resolve)
      },
      (error) => {
        reject("Can't get floor " + error.message)
      }
    )
  }
  setUniverse2Test = (
    resolve: (data: any) => void,
    reject: (data: any) => void
  ) => {
    mapwizeApi.getVenue(venueId).then(
      (venue: Venue) => {
        mapwizeApi.getAccessibleUniversesForVenue(venue).then(
          (universes: Universe[]) => {
            this.state.strongRef?.setUniverse(universes[1])
            resolve(universes[1])
          },
          (error) =>
            reject("Can't getAccessibleUniversesForVenue " + error.message)
        )
      },
      (error) => reject("Can't getVenue " + error.message)
    )
  }
  setUniverse1Test = (
    resolve: (data: any) => void,
    reject: (data: any) => void
  ) => {
    mapwizeApi.getVenue(venueId).then(
      (venue: Venue) => {
        mapwizeApi.getAccessibleUniversesForVenue(venue).then(
          (universes: Universe[]) => {
            this.state.strongRef?.setUniverse(universes[1])
            resolve(universes[1])
          },
          (error) =>
            reject("Can't getAccessibleUniversesForVenue " + error.message)
        )
      },
      (error) => reject("Can't getVenue " + error.message)
    )
  }
  setLanguageTest = (
    resolve: (data: any) => void,
    reject: (data: any) => void
  ) => {
    mapwizeApi.getVenue(venueId).then(
      (venue: Venue) => {
        this.state.strongRef?.setLanguageForVenue('en', venue)
        resolve('en')
      },
      (error) => reject("Can't getVenue " + error.message)
    )
  }
  addMarkerTest = (
    resolve: (data: any) => void,
    reject: (data: any) => void
  ) => {
    mapwizeApi.getPlace(placeId).then(
      (place: Place) => {
        this.state.strongRef?.centerOn(place)
        this.setState({ markersProp: [new MarkerProp(place)] })
        resolve(place)
      },
      (error) => reject("Can't getVenue " + error.message)
    )
  }
  removeMarkersTest = (resolve: (data: any) => void) => {
    this.setState({
      markersProp: undefined,
    })
    resolve(null)
  }
  addPromotedPlaceTest = (
    resolve: (data: any) => void,
    reject: (data: any) => void
  ) => {
    mapwizeApi.getPlace(placeId).then(
      (place: Place) => {
        this.state.strongRef?.centerOn(place)
        this.setState({ promotedPlaces: [place] })
        resolve(place)
      },
      (error) => reject("Can't getVenue " + error.message)
    )
  }
  removePromotedPlacesTest = (resolve: (data: any) => void) => {
    this.setState({
      promotedPlaces: undefined,
    })
    resolve(null)
  }
  selectPlaceTest = (
    resolve: (data: any) => void,
    reject: (data: any) => void
  ) => {
    mapwizeApi.getPlace(placeId).then(
      (place: Place) => {
        this.state.strongRef?.centerOn(place)
        this.setState({ selectedPlace: place })
        resolve(place)
      },
      (error) => reject("Can't getVenue " + error.message)
    )
  }
  removeSelectedPlacesTest = (resolve: (data: any) => void) => {
    this.setState({
      selectedPlace: undefined,
    })
    resolve(null)
  }
  setDirectionTest = (
    resolve: (data: any) => void,
    reject: (data: any) => void
  ) => {
    mapwizeApi.getPlace('5eb40d9955039600161ce6d3').then((place1) => {
      mapwizeApi.getPlace('5d08d8a4efe1d20012809ee5').then((place2) => {
        const mode = new DirectionMode('5da6bec9aefa100010c7df67', '', 0.0, '')
        mapwizeApi.getDirection(place1, place2, mode).then(
          (direction: Direction) => {
            this.setState({
              directionProp: new DirectionProp(
                direction,
                new DirectionOptions().setCenterOnStart(false)
              ),
            })
            resolve(direction)
          },
          (error) => {
            showAlert('getDirectionTest Failed', error.message, reject)
          }
        )
      })
    })
  }
  removeDirectionTest = (resolve: (data: any) => void) => {
    this.setState({
      directionProp: undefined,
    })
    resolve(null)
  }
  setPlaceStylesTest = (resolve: (data: any) => void) => {
    const placeStyles = [
      new PlaceStyleProp(
        '5bc49413bf0ed600114db1f0',
        new Style(undefined, '#84440f', 1)
      ),
      new PlaceStyleProp(
        '5eb40d997b62ff00167fca1c',
        new Style(undefined, '#8444ff', 1)
      ),
    ]
    this.setState({
      placeStyles,
    })
    resolve(null)
  }
  removePlaceStylesTest = (resolve: (data: any) => void) => {
    this.setState({
      placeStyles: undefined,
    })
    resolve(null)
  }
  startNavigationTest = (
    resolve: (data: any) => void,
    reject: (data: any) => void
  ) => {
    mapwizeApi.getPlace('5eb40d9955039600161ce6d3').then((place1) => {
      console.log(place1.entranceCoordinate)
      this.setState({
        userLocation: place1.entranceCoordinate,
      })
      mapwizeApi.getPlace('5d08d8a4efe1d20012809ee5').then(
        (destination) => {
          const mode = new DirectionMode(
            '5da6bec9aefa100010c7df67',
            '',
            0.0,
            ''
          )
          const opts = new DirectionOptions()
          opts.displayEndMarker = false
          const navProps = new NavigationProp(destination, mode, opts, 15)
          this.setState({
            navigationProp: navProps,
          })
          resolve(navProps)
        },
        (error) => {
          showAlert('getDirectionTest Failed', error.message, reject)
        }
      )
    })
  }
  stopNavigationTest = (resolve: (data: any) => void) => {
    this.setState({
      navigationProp: undefined,
    })
    resolve(undefined)
  }
  removeUserLocationTest = (resolve: (data: any) => void) => {
    this.setState({
      userLocation: undefined,
    })
    resolve(null)
  }
  zoomToTest = (resolve: (data: any) => void) => {
    this.state.strongRef?.zoomTo(14)
    resolve(true)
  }
  getZoomTest = (resolve: (data: any) => void, reject: (data: any) => void) => {
    this.state.strongRef?.getZoom().then(
      (zoom: Number) => {
        showAlert('Got Zoom', zoom, resolve)
      },
      (error) => {
        reject("Can't get zoom " + error.message)
      }
    )
  }
  getTests = () => {
    // eslint-disable-next-line consistent-this
    const testClass: any = this
    const tests = Object.keys(this)
      .filter((field: string) => field.endsWith('Test'))
      .reduce((pTest: any, test: string) => {
        pTest[test] = { test: testClass[test], passed: true }
        return pTest
      }, {})
    return tests
  }
  runTests = () => {
    const testsG = this.state.tests
    var p = Promise.resolve()
    Object.keys(testsG).forEach((testName: any) => {
      p = p.then(
        () =>
          new Promise((resolve) =>
            this.state.tests[testName].test(
              () => {
                const tests = this.state.tests
                const newtests = { ...tests }
                newtests[testName] = {
                  test: tests[testName].test,
                  passed: true,
                  run: true,
                }
                this.setState({ tests: newtests })
                setTimeout(resolve, timeBetweenAutomaticTests)
              },
              (error: any) => {
                const tests = this.state.tests
                const newtests = { ...tests }
                newtests[testName] = {
                  test: tests[testName].test,
                  passed: false,
                  error,
                }
                this.setState({ tests: newtests })
                setTimeout(resolve, timeBetweenAutomaticTests)
              }
            )
          )
      )
    })
    p.then(testEnded)
  }
  constructor(props: any) {
    super(props)
    this.state = {
      tests: this.getTests(),
    } as any
  }

  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <View style={{ flex: 1, flexDirection: 'column' }}>
          <MapwizeMap
            style={styles.map}
            mapwizeConfiguration={mapwizeConfiguration}
            mapOptions={mapOptions}
            onMapLoaded={(ref) => {
              this.setState({ strongRef: ref })
            }}
            onMapClick={(clickEvent: ClickEvent) => {
              console.log(clickEvent.latLngFloor)
              this.setState({
                userLocation: clickEvent.latLngFloor,
                selectedPlace: clickEvent.placePreview,
              })
            }}
            mapDirection={this.state.directionProp}
            markers={this.state.markersProp}
            placeStyles={this.state.placeStyles}
            promotedPlaces={this.state.promotedPlaces}
            selectedPlace={this.state.selectedPlace}
            onVenueExit={(venue: Venue) =>
              this.setState({ venueExit: venue, venueEnter: undefined })
            }
            onVenueEnter={(venue: Venue) =>
              this.setState({ venueEnter: venue, venueExit: undefined })
            }
            onDirectionModesChange={(directionModes) =>
              console.log(JSON.stringify(directionModes))
            }
            userLocation={this.state.userLocation}
            onFloorChange={(floor: Floor) => this.setState({ floor })}
            onUniverseChange={(universe: Universe) =>
              this.setState({ universe })
            }
            onLanguageChange={(language: string) => this.setState({ language })}
            mapNavigation={this.state.navigationProp}
            onNavigationWillStart={() =>
              this.setState({ navigationEvent: 'Navigation will start' })
            }
            onNavigationStart={() =>
              this.setState({ navigationEvent: 'Navigation started' })
            }
            onNavigationUpdate={(navInfo) =>
              this.setState({ navigationEventInfo: navInfo })
            }
            onNavigationStop={() =>
              this.setState({ navigationEvent: 'Navigation stopped' })
            }
            onNavigationError={(error) =>
              this.setState({ navigationEvent: 'Navigation error : ' + error })
            }
          />
        </View>
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            onPress={() => this.runTests()}
            style={{ padding: 16, alignItems: 'center' }}
          >
            <Text style={{ color: '#245', fontSize: 24, fontWeight: 'bold' }}>
              Run All tests
            </Text>
          </TouchableOpacity>
          <ScrollView>
            <View style={{ backgroundColor: '#245' }}>
              {Object.keys(this.state.tests).map(
                (testName: string, index: number) => (
                  <TouchableOpacity
                    onPress={() =>
                      this.state.tests[testName].test(
                        () => {
                          const tests = this.state.tests
                          const newtests = { ...tests }
                          newtests[testName] = {
                            test: tests[testName].test,
                            passed: true,
                            run: true,
                          }
                          this.setState({ tests: newtests })
                        },
                        (error: any) => {
                          const tests = this.state.tests
                          const newtests = { ...tests }
                          newtests[testName] = {
                            test: tests[testName].test,
                            passed: false,
                            error,
                            run: true,
                          }
                          this.setState({ tests: newtests })
                        }
                      )
                    }
                    key={index}
                    style={{
                      padding: 8,
                      backgroundColor: index % 2 === 1 ? '#eee' : '#fff',
                      alignItems: 'flex-start',
                      borderColor: '#efe',
                      paddingHorizontal: 80,
                      marginHorizontal: 16,
                    }}
                  >
                    <Text
                      style={{
                        color: this.state.tests[testName].passed
                          ? this.state.tests[testName].run
                            ? '#6a2'
                            : '#245'
                          : '#f00',
                        fontSize: 20,
                        textAlign: 'left',
                        fontWeight: this.state.tests[testName].passed
                          ? this.state.tests[testName].run
                            ? 'bold'
                            : 'normal'
                          : 'bold',
                      }}
                    >
                      {testName.replace('Test', '') +
                        (this.state.tests[testName].passed
                          ? ''
                          : ' Error : ' + this.state.tests[testName].error)}
                    </Text>
                  </TouchableOpacity>
                )
              )}
            </View>
          </ScrollView>
          <View
            style={{
              height: 120,
              padding: 4,
              flexWrap: 'wrap',
              flexDirection: 'row',
            }}
          >
            <Text style={{ padding: 4 }}>
              {'floor : ' + (this.state.floor && this.state.floor.number)}
            </Text>
            <Text style={{ padding: 4 }}>
              {'universe : ' +
                (this.state.universe && this.state.universe.name)}
            </Text>
            <Text style={{ padding: 4 }}>
              {'language : ' + (this.state.language && this.state.language)}
            </Text>
            <Text style={{ padding: 4 }}>
              {this.state.venueEnter &&
                'venueEnter : ' + this.state.venueEnter.name}
              {this.state.venueExit &&
                'venueExit : ' + this.state.venueExit.name}
            </Text>
            <Text style={{ padding: 4 }}>
              {'Navigation event : ' +
                (this.state.navigationEvent && this.state.navigationEvent)}
            </Text>
            <Text style={{ padding: 4 }}>
              {'navigation Event Info : ' +
                (this.state.navigationEventInfo &&
                  JSON.stringify(this.state.navigationEventInfo))}
            </Text>
          </View>
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00FF00',
  },
  map: {
    flex: 1,
  },
})

const showAlert = (
  title: string,
  data: any,
  callback: (data: string) => void
) => {
  let stopped = false
  const buttons = [
    { text: 'Stop', onPress: () => (stopped = true) } as AlertButton,
  ]
  const message = JSON.stringify(data, null, 2)
  callback &&
    buttons.push({
      text: 'Next',
      onPress: () => {
        stopped = true
        callback(message)
      },
    } as AlertButton)

  Alert.alert(title, message, buttons)
  callback && !stopped && callback(message)
}
const testEnded = () => {
  Alert.alert('Test has ended', '', [{ text: 'Finish' } as AlertButton])
}
