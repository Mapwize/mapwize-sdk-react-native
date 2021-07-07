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
  CreateOfflineManager,
  MapwizeConfiguration,
  MapwizeApi,
  Venue,
  Universe,
  OfflineManager,
  OfflineRegion,
} from 'mapwize-sdk-react-native'
const mapwizeConfiguration = new MapwizeConfiguration(
  '47aabfedfe66c0cf4a5ebe0c0bdb6d0d'
)
const mapwizeApi: MapwizeApi = CreateMapwizeAPI(mapwizeConfiguration)

const venueId = '56b20714c3fa800b00d8f0b5'

const testEnded = () => {
  Alert.alert('Test has ended', '', [{ text: 'Finish' } as AlertButton])
}

interface IState {
  tests: any
  progress1: number
  progress2: number
  offlineMangerState1: string
  offlineMangerState2: string
}
interface IProps {}
export default class TestApi extends React.PureComponent<IProps, IState> {
  downloadDataUniverse1Test = (resolve: () => void, reject: () => void) => {
    const offlineManager: OfflineManager =
      CreateOfflineManager(mapwizeConfiguration)
    mapwizeApi &&
      mapwizeApi.getVenue(venueId).then((venue: Venue) => {
        mapwizeApi
          .getAccessibleUniversesForVenue(venue)
          .then((universes: Universe[]) => {
            const universe = universes[0]
            const offlineRegionIn = new OfflineRegion(venue, universe)
            offlineManager
              .downloadData(offlineRegionIn, (progress1: number) => {
                this.setState({ progress1, offlineMangerState1: 'Downloading' })
              })
              .then(
                (offlineRegion: OfflineRegion) => {
                  this.setState({
                    offlineMangerState1:
                      'Download Success : ' +
                      JSON.stringify(
                        {
                          venueName:
                            offlineRegion.venue && offlineRegion.venue.name,
                          universeName:
                            offlineRegion.universe &&
                            offlineRegion.universe.name,
                          minZoom: offlineRegion.minZoom,
                          maxZoom: offlineRegion.maxZoom,
                        },
                        null,
                        2
                      ),
                  })
                  resolve()
                },
                (message: string) => {
                  this.setState({ offlineMangerState1: message })
                  reject()
                }
              )
          })
      })
  }
  downloadDataUniverse2Test = (
    resolve: () => void,
    reject: (reason: string) => void
  ) => {
    const offlineManager: OfflineManager =
      CreateOfflineManager(mapwizeConfiguration)
    mapwizeApi &&
      mapwizeApi.getVenue(venueId).then((venue: Venue) => {
        mapwizeApi
          .getAccessibleUniversesForVenue(venue)
          .then((universes: Universe[]) => {
            const universe = universes[1]
            if (!universe) {
              reject("can't find the second universe")
              return
            }
            const offlineRegionIn = new OfflineRegion(venue, universe)
            offlineManager
              .downloadData(offlineRegionIn, (progress2: number) => {
                this.setState({ progress2, offlineMangerState2: 'Downloading' })
              })
              .then(
                (offlineRegion: OfflineRegion) => {
                  this.setState({
                    offlineMangerState2:
                      'Download Success : ' +
                      JSON.stringify(
                        {
                          venueName:
                            offlineRegion.venue && offlineRegion.venue.name,
                          universeName:
                            offlineRegion.universe &&
                            offlineRegion.universe.name,
                          minZoom: offlineRegion.minZoom,
                          maxZoom: offlineRegion.maxZoom,
                        },
                        null,
                        2
                      ),
                  })
                  resolve()
                },
                (message: string) => {
                  this.setState({ offlineMangerState2: message })
                  reject(message)
                }
              )
          })
      })
  }
  updateDataTest = (resolve: () => void, reject: (reason: string) => void) => {
    const offlineManager: OfflineManager =
      CreateOfflineManager(mapwizeConfiguration)
    mapwizeApi &&
      mapwizeApi.getVenue(venueId).then((venue: Venue) => {
        mapwizeApi
          .getAccessibleUniversesForVenue(venue)
          .then((universes: Universe[]) => {
            const universe = universes[1]
            if (!universe) {
              reject("can't find the second universe")
              return
            }
            const offlineRegionIn = new OfflineRegion(venue, universe)
            offlineManager
              .updateData(offlineRegionIn, (progress1: number) => {
                this.setState({ progress1, offlineMangerState1: 'Updating' })
              })
              .then(
                (offlineRegion: OfflineRegion) => {
                  this.setState({
                    offlineMangerState1:
                      'Update Success : ' +
                      JSON.stringify(
                        {
                          venueName:
                            offlineRegion.venue && offlineRegion.venue.name,
                          universeName:
                            offlineRegion.universe &&
                            offlineRegion.universe.name,
                          minZoom: offlineRegion.minZoom,
                          maxZoom: offlineRegion.maxZoom,
                        },
                        null,
                        2
                      ),
                  })
                  resolve()
                },
                (message: string) => {
                  this.setState({ offlineMangerState1: message })
                  reject(message)
                }
              )
          })
      })
  }

  getOfflineRegionTest = (
    resolve: () => void,
    reject: (reason: string) => void
  ) => {
    const offlineManager: OfflineManager =
      CreateOfflineManager(mapwizeConfiguration)
    mapwizeApi &&
      mapwizeApi.getVenue(venueId).then((venue: Venue) => {
        mapwizeApi
          .getAccessibleUniversesForVenue(venue)
          .then((universes: Universe[]) =>
            offlineManager.getOfflineRegion(venue, universes[0])
          )
          .then(
            (offlineRegion: OfflineRegion) => {
              this.setState({
                offlineMangerState1: 'Got : ' + JSON.stringify(offlineRegion),
              })
              resolve()
            },
            (message: string) => reject(message)
          )
      })
  }
  getOfflineRegionsTest = (
    resolve: () => void,
    reject: (reason: string) => void
  ) => {
    const offlineManager: OfflineManager =
      CreateOfflineManager(mapwizeConfiguration)
    offlineManager.getOfflineRegions().then(
      (offlineRegions: OfflineRegion[]) => {
        this.setState({
          offlineMangerState1:
            'Got : ' +
            JSON.stringify(
              offlineRegions.map((offlineRegion) => ({
                venueName: offlineRegion.venue && offlineRegion.venue.name,
                universeName:
                  offlineRegion.universe && offlineRegion.universe.name,
                minZoom: offlineRegion.minZoom,
                maxZoom: offlineRegion.maxZoom,
              })),
              null,
              2
            ) +
            ' offline regions',
        })
        resolve()
      },
      (message: string) => {
        this.setState({ offlineMangerState1: message })
        reject(message)
      }
    )
  }
  removeFirstOfflineRegionTest = (
    resolve: () => void,
    reject: (reason: string) => void
  ) => {
    const offlineManager: OfflineManager =
      CreateOfflineManager(mapwizeConfiguration)
    offlineManager
      .getOfflineRegions()
      .then((offlineRegions: OfflineRegion[]) => {
        if (!offlineRegions[0]) {
          reject('There is no offline Region')
          return
        }
        offlineManager.removeData(offlineRegions[0]).then(
          () => {
            resolve()
          },
          (message: string) => {
            reject(message)
          }
        )
      })
  }

  removeSecondOfflineRegionTest = (
    resolve: () => void,
    reject: (reason: string) => void
  ) => {
    const offlineManager: OfflineManager =
      CreateOfflineManager(mapwizeConfiguration)
    offlineManager
      .getOfflineRegions()
      .then((offlineRegions: OfflineRegion[]) => {
        if (!offlineRegions[1]) {
          reject('Second offlineRegion does not exist')
          return
        }
        offlineManager.removeData(offlineRegions[1]).then(
          () => {
            resolve()
          },
          (message: string) => {
            reject(message)
          }
        )
      })
  }
  hasOfflineRegionTest = (
    resolve: () => void,
    reject: (reason: string) => void
  ) => {
    const offlineManager: OfflineManager =
      CreateOfflineManager(mapwizeConfiguration)
    mapwizeApi &&
      mapwizeApi.getVenue(venueId).then((venue: Venue) => {
        mapwizeApi
          .getAccessibleUniversesForVenue(venue)
          .then((universes: Universe[]) =>
            offlineManager.hasOfflineRegion(venue, universes[0])
          )
          .then(
            (has: Boolean) =>
              has ? resolve() : reject('The is no offline region'),
            (message: string) => reject(message)
          )
      })
  }
  checkForUpdateTest = (
    resolve: () => void,
    reject: (reason: string) => void
  ) => {
    const offlineManager: OfflineManager =
      CreateOfflineManager(mapwizeConfiguration)
    offlineManager
      .getOfflineRegions()
      .then((offlineRegions: OfflineRegion[]) => {
        if (!offlineRegions[0]) {
          reject('There is no offline Region')
          return
        }
        offlineManager.checkForUpdate(offlineRegions[0]).then(
          (has: Boolean) => (has ? resolve() : reject('there is no update')),
          (message: string) => {
            reject(message)
          }
        )
      })
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
      progress1: 0,
      progress2: 0,
      offlineMangerState1: 'Not Started Yet',
      offlineMangerState2: 'Not Started Yet',
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
        <View
          style={{
            height: 400,
            padding: 4,
            flexDirection: 'row',
          }}
        >
          <View
            style={{
              flex: 1,
              padding: 8,
            }}
          >
            <Text style={{ padding: 8, fontSize: 22, textAlign: 'center' }}>
              {'First DownloadManger'}
            </Text>
            <Text style={{ padding: 4 }}>
              {'offlineMangerState : ' + this.state.offlineMangerState1}
            </Text>
            <Text style={{ padding: 4 }}>
              {'progress : ' + this.state.progress1}
            </Text>
          </View>

          <View
            style={{
              flex: 1,
              padding: 8,
              backgroundColor: '#eee',
            }}
          >
            <Text style={{ padding: 8, fontSize: 22, textAlign: 'center' }}>
              {'Second DownloadManger'}
            </Text>
            <Text style={{ padding: 4 }}>
              {'offlineMangerState : ' + this.state.offlineMangerState2}
            </Text>
            <Text style={{ padding: 4 }}>
              {'progress : ' + this.state.progress2}
            </Text>
          </View>
        </View>
      </View>
    )
  }
}
