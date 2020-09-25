/* eslint-disable react-native/no-inline-styles */
import * as React from 'react'
import {
  Alert,
  AlertButton,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
} from 'react-native'
import {
  CreateMapwizeAPI,
  MapwizeConfiguration,
  Place,
  MapwizeApi,
  Direction,
  DirectionMode,
  Placelist,
  SearchParams,
  MapwizeObject,
  Venue,
  ApiFilter,
  Universe,
  Layer,
  DistanceResponse,
} from 'mapwize-sdk-react-native'
const mapwizeConfiguration = new MapwizeConfiguration(
  '47aabfedfe66c0cf4a5ebe0c0bdb6d0d'
)
const api1: MapwizeApi = CreateMapwizeAPI(mapwizeConfiguration)
const venueId = '56b20714c3fa800b00d8f0b5'
const placeId = '5bc49413bf0ed600114db1f0'
const layerId = '5ed12401f167b30016e2d61b'
const placelistId = '5784fc5f7f2a900b0055f603'
const apiKeyRestricted = '70cdc17a7590a2dcd7333ef5e09a5892'
const accessKey = 'ELyNoFClJYJCWnTO'
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
  callback && setTimeout(() => !stopped && callback(message), 1000)
}
const testEnded = () => {
  Alert.alert('Test has ended', '', [{ text: 'Finish' } as AlertButton])
}
const failed = (message: any, resolve: () => void) => {
  showAlert('Test failed', message, resolve)
}
const isSorted = (arr: Array<any>) =>
  arr.every((v, i, a) => !i || a[i - 1] <= v)

interface IState {
  tests: any
}
interface IProps {}
export default class TestApi extends React.PureComponent<IProps, IState> {
  search1Test = (resolve: () => void, reject: () => void) => {
    const searchParams = new SearchParams('Rest').setObjectClasses([
      'place',
      'placelist',
      'venue',
    ])
    api1 &&
      api1.search(searchParams).then(
        (mapwizeObjects: MapwizeObject[]) => {
          showAlert(
            "search1() in Euratech for 'fr' with objectClass ['place', 'placelist', 'venue']', showing names",
            mapwizeObjects.map((object) => ({
              _id: object._id,
              name: object.name,
              type: object.objectClass,
            })),
            resolve
          )
        },
        (error) => {
          showAlert('search1', error.message, reject)
        }
      )
  }
  search2Test = (resolve: () => void, reject: () => void) => {
    const searchParams = new SearchParams('bathroom')
      .setObjectClasses(['place', 'placelist'])
      .setVenueId(venueId)

    api1.search(searchParams).then(
      (mapwizeObjects: MapwizeObject[]) => {
        showAlert(
          "search2() in Euratech for 'bathroom' with objectClass ['place', 'placelist']', with .setVenueId('56b20714c3fa800b00d8f0b5')",
          mapwizeObjects.map((object) => ({
            _id: object._id,
            name: object.name,
            type: object.objectClass,
          })),
          resolve
        )
      },
      (error) => {
        showAlert('search2', error.message, reject)
      }
    )
  }
  mapConfigsDummyApiKeyTest = (resolve: () => void, reject: () => void) => {
    const mapConfigDummy = new MapwizeConfiguration('dummy')
    const api = CreateMapwizeAPI(mapConfigDummy)
    api &&
      api.getPlace('5bc49413bf0ed600114db1f0').then(
        (place: Place) => {
          showAlert(
            "Test failed, shouldn't get the place with dummy API",
            place,
            reject
          )
        },
        (error) => {
          showAlert('Get Place for dummy config', error.message, resolve)
        }
      )
  }

  getAccessTest = (resolve: () => void, reject: () => void) => {
    api1.getVenue(venueId).then((venue: Venue) => {
      api1
        .getAccessibleUniversesForVenue(venue)
        .then((universes1: Universe[]) => {
          api1.getAccess(accessKey).then(
            (gotAccess: boolean) => {
              if (!gotAccess) {
                showAlert(
                  `getAccessTest('${accessKey}') Failed`,
                  'Could not get access',
                  reject
                )
                return
              }
              api1
                .getAccessibleUniversesForVenue(venue)
                .then((universes2: Universe[]) => {
                  if (universes1.length !== universes2.length) {
                    showAlert(
                      `getAccessTest('${accessKey}')`,
                      "before accesskey universes' length = " +
                        universes1.length +
                        "\n after accesskey universes' length = " +
                        universes2.length,
                      resolve
                    )
                  } else {
                    showAlert(
                      `getAccessTest('${accessKey}') Failed`,
                      'Got the same universe list length = ' +
                        universes2.length,
                      reject
                    )
                  }
                })
            },
            (error) => {
              showAlert(
                `getAccessTest('${accessKey}') Failed`,
                error.message,
                reject
              )
            }
          )
        })
    })
  }

  getAccessDummyKeyTest = (resolve: () => void, reject: () => void) => {
    api1.getAccess('dummyKey').then(
      (gotAccess: boolean) => {
        if (gotAccess) {
          showAlert(`getAccessTest('${accessKey}') Failed`, gotAccess, reject)
        } else {
          showAlert(`getAccessTest('${accessKey}')`, gotAccess, resolve)
        }
      },
      (error) => {
        showAlert(`getAccessTest('${accessKey}')`, error.message, resolve)
      }
    )
  }
  twoConfigsApiKeyTest = (resolve: () => void, reject: () => void) => {
    const api = CreateMapwizeAPI(new MapwizeConfiguration(apiKeyRestricted))

    api1.getVenue(venueId).then((venue: Venue) => {
      api.getAccessibleUniversesForVenue(venue).then(
        (universes1: Universe[]) => {
          api1
            .getAccessibleUniversesForVenue(venue)
            .then((universes2: Universe[]) => {
              if (universes1.length !== universes2.length) {
                showAlert(
                  'Got two universes list for two apiKey',
                  'first apiKey universes = ' +
                    universes1.length +
                    ', second apiKey universes = ' +
                    universes2.length,
                  resolve
                )
              } else {
                showAlert(
                  'Got two universes list for two apiKey',
                  'Test failed',
                  reject
                )
              }
            })
        },
        (error) => failed(error.message, reject)
      )
    })
  }
  getDirectionMultipleToWaypointsTest = (
    resolve: () => void,
    reject: () => void
  ) => {
    api1.getPlace('5eb40d9955039600161ce6d3').then((place1) => {
      api1.getPlace('5d08d8a4efe1d20012809ee5').then((place2) => {
        const mode = new DirectionMode('5da6bec9aefa100010c7df67', '', 0.0, '')
        api1
          .getDirection(place1, [place2, place2, place2], mode, [
            place2,
            place2,
            place2,
          ])
          .then(
            (direction: Direction) => {
              showAlert(
                'getDirectionMultipleToWaypointsTest',
                direction,
                resolve
              )
            },
            (error) => {
              showAlert(
                'getDirectionMultipleToWaypointsTest Failed',
                error.message,
                reject
              )
            }
          )
      })
    })
  }
  getDirectionWaypointTest = (resolve: () => void, reject: () => void) => {
    api1
      .search(new SearchParams('Le Switch'))
      .then((mapwizeObjects: Array<MapwizeObject>) => {
        api1
          .search(
            new SearchParams('F')
              .setVenueId(venueId)
              .setObjectClasses(['place', 'placelist'])
          )
          .then((mapwizeObjects2: Array<MapwizeObject>) => {
            const mode = new DirectionMode(
              '5da6bec9aefa100010c7df67',
              '',
              0.0,
              ''
            )
            api1
              .getDirection(mapwizeObjects[0], mapwizeObjects2[0], mode, [
                mapwizeObjects2[0],
                mapwizeObjects2[1],
                mapwizeObjects2[2],
              ])
              .then(
                (direction: Direction) => {
                  showAlert('getDirectionWaypointTest', direction, resolve)
                },
                (error) => {
                  showAlert(
                    'getDirectionWaypointTest Failed',
                    error.message,
                    reject
                  )
                }
              )
          })
      })
  }
  getDirectionToManyTest = (resolve: () => void, reject: () => void) => {
    api1.getPlace('5eb40d9955039600161ce6d3').then((place1) => {
      api1.getPlace('5d08d8a4efe1d20012809ee5').then((place2) => {
        const mode = new DirectionMode('5da6bec9aefa100010c7df67', '', 0.0, '')
        api1.getDirection(place1, [place2, place2, place2], mode).then(
          (direction: Direction) => {
            showAlert('getDirectionMultipleTo', direction, resolve)
          },
          (error) => {
            showAlert('getDirectionMultipleTo Failed', error.message, reject)
          }
        )
      })
    })
  }
  getDirectionTest = (resolve: () => void, reject: () => void) => {
    api1.getPlace('5eb40d9955039600161ce6d3').then((place1) => {
      api1.getPlace('5d08d8a4efe1d20012809ee5').then((place2) => {
        const mode = new DirectionMode('5da6bec9aefa100010c7df67', '', 0.0, '')
        api1.getDirection(place1, place2, mode).then(
          (direction: Direction) => {
            showAlert('getDirectionTest', direction, resolve)
          },
          (error) => {
            showAlert('getDirectionTest Failed', error.message, reject)
          }
        )
      })
    })
  }
  getPlaceName = (id: string) => api1.getPlace(id).then((place) => place.name)

  getDistancesTest = (resolve: () => void, reject: () => void) => {
    api1.getPlace('5eb40d9955039600161ce6d3').then((place) => {
      api1.getPlace('5eb40d98844640001629c883').then((meeting2) => {
        api1.getPlace('5eb40d98844640001629c879').then((meeting3) => {
          api1.getPlace('5eb40d987b62ff00167fca10').then((meeting1) => {
            api1.getPlace('5eb40d99844640001629c893').then((meeting4) => {
              const mode = new DirectionMode(
                '5da6bec9aefa100010c7df67',
                '',
                0.0,
                ''
              )
              api1
                .getDistances(
                  place,
                  [meeting2, meeting3, meeting1, meeting4],
                  mode,
                  true
                )
                .then(
                  (distanceResponse: DistanceResponse) => {
                    if (
                      !isSorted(
                        distanceResponse.distances.map(
                          (distances) => distances.traveltime
                        )
                      )
                    ) {
                      showAlert(
                        'getDistancesTest Failed',
                        'distanceResponse is not sorted by travel time',
                        reject
                      )
                      return
                    }
                    const data: any = []
                    const promises: Promise<any>[] = []
                    console.log(distanceResponse)
                    distanceResponse.distances.forEach((distance) => {
                      promises.push(
                        this.getPlaceName(
                          distance.placeId || ''
                        ).then((name: string) =>
                          data.push({ time: distance.traveltime, name })
                        )
                      )
                    })
                    Promise.all(promises).then(() => {
                      showAlert('getDistancesTest', data, resolve)
                    })
                  },
                  (error) => {
                    showAlert('getDistancesTest Failed', error.message, reject)
                  }
                )
            })
          })
        })
      })
    })
  }
  getMainFromsTest = (resolve: () => void, reject: () => void) => {
    api1.getVenue(venueId).then((venue: Venue) => {
      api1.getMainFroms(venue).then(
        (places: Place[]) => {
          showAlert(
            'getMainFromsTest',
            places.map((place) => place.name),
            resolve
          )
        },
        (error) => {
          showAlert('getMainFromsTest Failed', error.message, reject)
        }
      )
    })
  }
  getMainSearchesTest = (resolve: () => void, reject: () => void) => {
    api1.getVenue(venueId).then((venue: Venue) => {
      api1.getMainSearches(venue).then(
        (mapwizeObjects: MapwizeObject[]) => {
          showAlert(
            'getMainSearchesTest',
            mapwizeObjects.map((object) => object.name),
            resolve
          )
        },
        (error) => {
          showAlert('getMainSearchesTest Failed', error.message, reject)
        }
      )
    })
  }
  getLayersTest = (resolve: () => void, reject: () => void) => {
    const apiFilter = new ApiFilter().setVenueId(venueId)
    api1.getLayers(apiFilter).then(
      (layers: Layer[]) => {
        showAlert(
          'getLayersTest',
          layers.map((object) => object.name),
          resolve
        )
      },
      (error) => {
        showAlert('getLayersTest Failed', error.message, reject)
      }
    )
  }
  getLayerTest = (resolve: () => void, reject: () => void) => {
    api1.getLayer(layerId).then(
      (layer1: Layer) =>
        showAlert(`getLayerTest('${layerId}')`, layer1, resolve),
      (error) => {
        showAlert('getLayerTest Failed', error.message, reject)
      }
    )
  }
  getLayerWithNameTest = (resolve: () => void, reject: () => void) => {
    api1.getVenue(venueId).then((venue: Venue) => {
      api1.getLayerWithName('Euratech-Zoom', venue).then(
        (layer: Layer) => {
          showAlert('getLayerWithNameTest Euratech-Zoom', layer, resolve)
        },
        (error) => {
          showAlert('getLayerWithNameTest Failed', error.message, reject)
        }
      )
    })
  }
  getLayerWithAliasTest = (resolve: () => void, reject: () => void) => {
    api1.getVenue(venueId).then((venue: Venue) => {
      api1.getLayerWithAlias('Euratech-Zoom', venue).then(
        (layer: Layer) => {
          showAlert("getLayerWithAliasTest('Euratech-Zoom')", layer, resolve)
        },
        (error) => {
          showAlert('getLayerWithAliasTest Failed', error.message, reject)
        }
      )
    })
  }

  getPlacesTest = (resolve: () => void, reject: () => void) => {
    const apiFilter1 = new ApiFilter().setVenueId(venueId)
    api1 &&
      api1.getPlaces(apiFilter1).then(
        (places: Place[]) =>
          showAlert(
            "getPlaces('56b20714c3fa800b00d8f0b5'), showing names",
            places.map((place) => place.name),
            resolve
          ),
        (error) => {
          showAlert(`getPlaceTest('${placeId}') Failed`, error.message, reject)
        }
      )
  }
  getPlaceTest = (resolve: () => void, reject: () => void) => {
    api1.getPlace(placeId).then(
      (place: Place) => {
        showAlert(`getPlaceTest('${placeId}')`, place, resolve)
      },
      (error) => {
        showAlert(`getPlaceTest('${placeId}') Failed`, error.message, reject)
      }
    )
  }

  getPlaceWithNameTest = (resolve: () => void, reject: () => void) => {
    api1.getVenue(venueId).then((venue: Venue) => {
      api1.getPlaceWithName('Mapwize', venue).then(
        (place: Place) => {
          showAlert("getPlaceWithNameTest('Mapwize')", place, resolve)
        },
        (error) => {
          showAlert('getPlaceWithNameTest Failed', error.message, reject)
        }
      )
    })
  }
  getPlaceWithAliasTest = (resolve: () => void, reject: () => void) => {
    api1.getVenue(venueId).then((venue: Venue) => {
      api1.getPlaceWithAlias('mapwize', venue).then(
        (place: Place) => {
          showAlert("getPlaceWithAliasTest('mapwize')", place, resolve)
        },
        (error) => {
          showAlert('getPlaceWithAliasTest Failed', error.message, reject)
        }
      )
    })
  }
  getPlacelistsTest = (resolve: () => void, reject: () => void) => {
    const apiFilter = new ApiFilter().setVenueId(venueId)
    api1.getPlacelists(apiFilter).then(
      (placelists: Placelist[]) => {
        showAlert(
          'getPlacelistsTest',
          placelists.map((object) => object.name),
          resolve
        )
      },
      (error) => {
        showAlert('getPlacelistsTest Failed', error.message, reject)
      }
    )
  }
  getPlacelistTest = (resolve: () => void, reject: () => void) => {
    api1.getPlacelist(placelistId).then(
      (placelist: Placelist) => {
        showAlert(`getPlacelistTest('${placelistId}')`, placelist, resolve)
      },
      (error) => {
        showAlert(
          `getPlacelistTest('${placelistId}') Failed`,
          error.message,
          reject
        )
      }
    )
  }
  getPlacelistWithNameTest = (resolve: () => void, reject: () => void) => {
    api1.getVenue(venueId).then((venue: Venue) => {
      api1.getPlacelistWithName('Bathrooms', venue).then(
        (placelist: Placelist) => {
          showAlert("getPlacelistWithNameTest('Bathrooms')", placelist, resolve)
        },
        (error) => {
          showAlert('getPlacelistWithNameTest Failed', error.message, reject)
        }
      )
    })
  }
  getPlacelistWithAliasTest = (resolve: () => void, reject: () => void) => {
    api1.getVenue(venueId).then((venue: Venue) => {
      api1.getPlacelistWithAlias('bathrooms', venue).then(
        (placelist: Placelist) => {
          showAlert(
            "getPlacelistWithAliasTest('bathrooms')",
            placelist,
            resolve
          )
        },
        (error) => {
          showAlert('getPlacelistWithAliasTest Failed', error.message, reject)
        }
      )
    })
  }
  getVenuesTest = (resolve: () => void, reject: () => void) => {
    const apiFilter1 = new ApiFilter()
    api1.getVenues(apiFilter1).then(
      (venues: Venue[]) => {
        showAlert(`getVenuesTest('${venues.length}')`, venues, resolve)
      },
      (error) => {
        showAlert(
          `getVenuesTest('euratechnologies') Failed`,
          error.message,
          reject
        )
      }
    )
  }
  getVenueTest = (resolve: () => void, reject: () => void) => {
    api1.getVenue(venueId).then(
      (venue: Venue) => {
        showAlert(`getVenueTest('${venueId}')`, venue.name, resolve)
      },
      (error) => {
        showAlert(`getVenueTest('${venueId}') Failed`, error.message, reject)
      }
    )
  }
  getVenueWithNameTest = (resolve: () => void, reject: () => void) => {
    api1.getVenueWithName('Euratechnologies').then(
      (venue: Venue) => {
        showAlert(`getVenueWithNameTest('${venue.name}')`, venue, resolve)
      },
      (error) => {
        showAlert(
          `getVenueWithNameTest('Euratechnologies') Failed`,
          error.message,
          reject
        )
      }
    )
  }
  getVenueWithAliasTest = (resolve: () => void, reject: () => void) => {
    api1.getVenueWithAlias('euratechnologies').then(
      (venue: Venue) => {
        showAlert(`getVenueWithAliasTest('${venue.alias}')`, venue, resolve)
      },
      (error) => {
        showAlert(
          `getVenueWithAliasTest('euratechnologies') Failed`,
          error.message,
          reject
        )
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
    const testsG: any = this.state.tests
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
                resolve()
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
                resolve()
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
    }
  }
  render() {
    return (
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
        <View style={{ height: 80 }} />
      </View>
    )
  }
}
