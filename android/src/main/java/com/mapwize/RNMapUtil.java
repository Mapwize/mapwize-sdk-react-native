package com.mapwize;

import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.util.Base64;
import android.util.Log;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.JavaOnlyArray;
import com.facebook.react.bridge.JavaOnlyMap;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableMapKeySetIterator;
import com.facebook.react.bridge.ReadableNativeMap;
import com.facebook.react.bridge.ReadableType;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;
import com.mapbox.mapboxsdk.geometry.LatLng;
import com.mapbox.mapboxsdk.geometry.LatLngBounds;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import io.indoorlocation.core.IndoorLocation;
import io.mapwize.mapwizesdk.api.ApiFilter;
import io.mapwize.mapwizesdk.api.Direction;
import io.mapwize.mapwizesdk.api.DirectionMode;
import io.mapwize.mapwizesdk.api.DirectionPointWrapper;
import io.mapwize.mapwizesdk.api.DirectionPointWrapperAndDistance;
import io.mapwize.mapwizesdk.api.DistanceResponse;
import io.mapwize.mapwizesdk.api.Floor;
import io.mapwize.mapwizesdk.api.LatLngFloor;
import io.mapwize.mapwizesdk.api.LatLngFloorInVenue;
import io.mapwize.mapwizesdk.api.Layer;
import io.mapwize.mapwizesdk.api.MapwizeIcon;
import io.mapwize.mapwizesdk.api.OfflineRegion;
import io.mapwize.mapwizesdk.api.Organization;
import io.mapwize.mapwizesdk.api.Parser;
import io.mapwize.mapwizesdk.api.Place;
import io.mapwize.mapwizesdk.api.PlaceDetails;
import io.mapwize.mapwizesdk.api.Placelist;
import io.mapwize.mapwizesdk.api.Route;
import io.mapwize.mapwizesdk.api.SearchParams;
import io.mapwize.mapwizesdk.api.Serializer;
import io.mapwize.mapwizesdk.api.Style;
import io.mapwize.mapwizesdk.api.Translation;
import io.mapwize.mapwizesdk.api.Universe;
import io.mapwize.mapwizesdk.api.UserInfo;
import io.mapwize.mapwizesdk.api.Venue;
import io.mapwize.mapwizesdk.core.MapwizeConfiguration;
import io.mapwize.mapwizesdk.map.ClickEvent;
import io.mapwize.mapwizesdk.map.DirectionOptions;
import io.mapwize.mapwizesdk.map.FollowUserMode;
import io.mapwize.mapwizesdk.map.MapOptions;
import io.mapwize.mapwizesdk.map.MapwizeIndoorLocation;
import io.mapwize.mapwizesdk.map.Marker;
import io.mapwize.mapwizesdk.map.NavigationInfo;
import io.mapwize.mapwizesdk.map.PlacePreview;
import io.mapwize.mapwizesdk.map.VenuePreview;

/**
 * Très fortement inspiré de https://gist.github.com/mfmendiola/bb8397162df9f76681325ab9f705748b
 * <p>
 * Permet de convertir de/vers les structures utilisées pour passer à travers le bridge de React.
 * Par contre :
 * - sais convertir vers des objets react certains objets Mapwize, mais n'est pas en
 * mesure de faire l'inverse.
 * - sais convertir les List en array. Mais l'inverse n'est pas vrai : les arrays ne sont jamais
 * transformés en List.
 */

public class RNMapUtil {

  private static final String TAG = "RNMapUtil";


  public RNMapUtil() {
  }

  public static WritableArray toRNArray(Object[] from) {
    WritableArray to = createArray();
    if (from != null) {
      for (int i = 0; i < from.length; i++) {
        append(to, from[i]);
      }
    }
    return to;
  }

  public static MapwizeConfiguration parseMapwizeConfiguration(ReadableMap from, Context context) {
    JSONObject jsonObject = convertMapToJson(from);
    return io.mapwize.mapwizesdk.map.Parser.parseMapwizeConfiguration(jsonObject, context);
  }

  public static WritableArray toRNArray(List from) {
    return toRNArray(from == null ? null : from.toArray());
  }

  public static WritableMap toRNMap(Object from) {
    WritableMap to = null;
    if (from != null) {
      try {
        if (from instanceof MapwizeConfiguration) {
          to = readJsonObject(Serializer.serializeMapwizeConfiguration((MapwizeConfiguration) from));
        } else if (from instanceof ApiFilter) {
          to = readJsonObject(Serializer.serializeApiFilter((ApiFilter) from));
        } else if (from instanceof SearchParams) {
          to = readJsonObject(Serializer.serializeSearchParams((SearchParams) from));
        } else if (from instanceof DirectionMode) {
          to = readJsonObject(Serializer.serializeDirectionMode((DirectionMode) from));
        } else if (from instanceof Direction) {
          to = readJsonObject(Serializer.serializeDirectionRN((Direction) from));
        } else if (from instanceof DirectionPointWrapperAndDistance) {
          to = readJsonObject(Serializer.serializeDirectionPointWrapperAndDistanceRN((DirectionPointWrapperAndDistance) from));
        } else if (from instanceof DirectionPointWrapper) {
          to = readJsonObject(Serializer.serializeDirectionPointWrapper((DirectionPointWrapper) from));
        } else if (from instanceof DistanceResponse) {
          to = readJsonObject(Serializer.serializeDistanceReponseRN((DistanceResponse) from));
        } else if (from instanceof Floor) {
          to = readJsonObject(Serializer.serializeFloor((Floor) from));
        } else if (from instanceof Route) {
          to = readJsonObject(Serializer.serializeRouteRN((Route) from));
        } else if (from instanceof LatLngFloorInVenue) {
          to = readJsonObject(Serializer.serializeLatLngFloorInVenue((LatLngFloorInVenue) from));
        } else if (from instanceof LatLngFloor) {
          to = readJsonObject(Serializer.serializeLatLngFloor((LatLngFloor) from));
        } else if (from instanceof LatLng) {
          to = readJsonObject(Serializer.serializeLatLng((LatLng) from));
        } else if (from instanceof LatLngBounds) {
          to = readJsonObject(Serializer.serializeLatLngBounds((LatLngBounds) from));
        } else if (from instanceof Layer) {
          to = readJsonObject(Serializer.serializeLayer((Layer) from));
        } else if (from instanceof MapwizeIcon) {
          to = readJsonObject(Serializer.serializeMapwizeIcon((MapwizeIcon) from));
        } else if (from instanceof Universe) {
          to = readJsonObject(Serializer.serializeUniverse((Universe) from));
        } else if (from instanceof Organization) {
          to = readJsonObject(Serializer.serializeOrganization((Organization) from));
        } else if (from instanceof Venue) {
          to = readJsonObject(Serializer.serializeVenue((Venue) from));
        } else if (from instanceof Style) {
          to = readJsonObject(Serializer.serializeStyle((Style) from));
        } else if (from instanceof UserInfo) {
          to = readJsonObject(Serializer.serializeUserInfo((UserInfo) from));
        } else if (from instanceof ClickEvent) {
          to = readJsonObject(Serializer.serializeClickEvent((ClickEvent) from));
        } else if (from instanceof DirectionOptions) {
          to = readJsonObject(Serializer.serializeDirectionOptions((DirectionOptions) from));
        } else if (from instanceof MapOptions) {
          to = readJsonObject(Serializer.serializeMapOptions((MapOptions) from));
        } else if (from instanceof Marker) {
          to = readJsonObject(Serializer.serializeMarker((Marker) from));
        } else if (from instanceof FollowUserMode) {
          to = readJsonObject(Serializer.serializeFollowUserMode((FollowUserMode) from));
        } else if (from instanceof MapwizeIndoorLocation) {
          to = readJsonObject(Serializer.serializeMapwizeIndoorLocation((MapwizeIndoorLocation) from));
        } else if (from instanceof IndoorLocation) {
          to = readJsonObject(Serializer.serializeIndoorLocation((IndoorLocation) from));
        } else if (from instanceof Translation) {
          to = readJsonObject(Serializer.serializeTranslation((Translation) from));
        } else if (from instanceof Placelist) {
          to = readJsonObject(Serializer.serializePlaceList((Placelist) from));
        } else if (from instanceof VenuePreview) {
          to = readJsonObject(Serializer.serializeVenuePreview((VenuePreview) from));
        } else if (from instanceof PlacePreview) {
          to = readJsonObject(Serializer.serializePlacePreview((PlacePreview) from));
        } else if (from instanceof NavigationInfo) {
          to = readJsonObject(Serializer.serializeNavigationInfo((NavigationInfo) from));
        } else if (from instanceof Place) {
          to = readJsonObject(Serializer.serializePlaceRN((Place) from));
        } else if (from instanceof PlaceDetails) {
          to = readJsonObject(Serializer.serializePlaceDetailsRN((PlaceDetails) from));
        }  else if (Map.class.isAssignableFrom(from.getClass())) {
          to = createMap();
          Map map = (Map) from;
          for (Iterator i = map.entrySet().iterator(); i.hasNext(); ) {
            Map.Entry e = (Map.Entry) i.next();
            append(to, (String) e.getKey(), e.getValue());
          }
        }
      } catch (Throwable e) {
        Log.e(TAG, "Unable to serialize Object to json : ", e);
      }
    }

    return to;
  }


  public static Object[] fromRNArray(ReadableArray from) {
    Object[] to = new Object[from.size()];
    for (int i = 0; i < from.size(); i++) {
      ReadableType type = from.getType(i);
      switch (type) {
        case Null:
          to[i] = null;
          break;
        case Boolean:
          to[i] = from.getBoolean(i);
          break;
        case Number:
          to[i] = from.getDouble(i);
          break;
        case String:
          to[i] = from.getString(i);
          break;
        case Map:
          to[i] = objectFromRNMap(from.getMap(i));
          break;
        case Array:
          to[i] = fromRNArray(from.getArray(i));
          break;
      }
    }
    return to;
  }

  public static Object objectFromRNMap(ReadableMap from) {//TODO infer type from objectClass field
    Object to = new HashMap<>();
    String objectClass = from.getString("objectClass");
    if (objectClass != null) {//Java Object
      try {
        JSONObject jsonObject = convertMapToJson(from);
        switch (objectClass) {
          case "ApiFilter":
            return Parser.parseApiFilter(jsonObject.toString());
          case "SearchParams":
            return Parser.parseSearchParams(jsonObject.toString());
          case "Direction":
            return Parser.parseDirection(jsonObject);
          case "DirectionMode":
            return Parser.parseDirectionMode(jsonObject);
          case "DirectionPointWrapper":
            return Parser.parseDirectionPointWrapper(jsonObject);
          case "DirectionPointWrapperAndDistance":
            return Parser.parseDirectionPointWrapperAndDistance(jsonObject);
          case "DistanceResponse":
            return Parser.parseDistanceResponseForRN(jsonObject);
          case "Floor":
            return Parser.parseFloor(jsonObject);
          case "Route":
            return Parser.parseRoute(jsonObject);
          case "LatLng":
            return Parser.parseLatLng(jsonObject);
          case "LatLngFloor":
            return Parser.parseLatLngFloor(jsonObject);
          case "LatLngFloorInVenue":
            return Parser.parseLatLngFloorInVenue(jsonObject);
          case "LatLngBounds":
            return Parser.parseLatLngBounds(jsonObject);
          case "Layer":
            return Parser.parseLayer(jsonObject);
          case "MapwizeIcon":
            return Parser.parseMapwizeIcon(jsonObject);
          case "Universe":
            return Parser.parseUniverse(jsonObject);
          case "Organization":
            return Parser.parseOrganization(jsonObject);
          case "Venue":
            return Parser.parseVenue(jsonObject);
          case "Style":
            return Parser.parseStyle(jsonObject.toString());
          case "UserInfo":
            return Parser.parseUser(jsonObject.toString());
          case "ClickEvent":
            return io.mapwize.mapwizesdk.map.Parser.parseClickEvent(jsonObject, null);//TODO get mapwize Api here
          case "DirectionOptions":
            return io.mapwize.mapwizesdk.map.Parser.parseDirectionOptions(jsonObject);
          case "MapOptions":
            return io.mapwize.mapwizesdk.map.Parser.parseMapOptions(jsonObject);
          case "Marker":
            return io.mapwize.mapwizesdk.map.Parser.parseMarker(jsonObject, null);
          case "FollowUserMode":
            return io.mapwize.mapwizesdk.map.Parser.parseFollowUserMode(jsonObject);
          case "IndoorLocation":
            return io.mapwize.mapwizesdk.map.Parser.parseIndoorLocation(jsonObject);
          case "MapwizeIndoorLocation":
            return io.mapwize.mapwizesdk.map.Parser.parseMapwizeIndoorLocation(jsonObject);
          case "Translation":
            return Parser.parseTranslation(jsonObject);
          case "Placelist":
            return Parser.parsePlacelist(jsonObject);
          case "VenuePreview":
            return io.mapwize.mapwizesdk.map.Parser.parseVenuePreview(jsonObject, null);
          case "PlacePreview":
            return io.mapwize.mapwizesdk.map.Parser.parsePlacePreview(jsonObject, null);
          case "Place":
            return Parser.parsePlaceRN(jsonObject);
          case "PlaceDetails":
            return Parser.parsePlaceDetailsRN(jsonObject);
          default:
            break;
        }
      } catch (JSONException e) {
        Log.e(TAG, "Can't parse json : " + e.getMessage());
      }
    } else {
      return fromRNMap(from);
    }


    return to;
  }

  public static Map<String, Object> fromRNMap(ReadableMap from) {//TODO infer type from objectClass field
    Map<String, Object> to = new HashMap<>();
    ReadableMapKeySetIterator iterator = from.keySetIterator();
    while (iterator.hasNextKey()) {
      String key = iterator.nextKey();
      ReadableType type = from.getType(key);
      switch (type) {
        case Boolean:
          to.put(key, from.getBoolean(key));
          break;
        case Number:
          to.put(key, from.getDouble(key));
          break;
        case String:
          to.put(key, from.getString(key));
          break;
        case Map:
          to.put(key, objectFromRNMap(from.getMap(key)));
          break;
        case Array:
          to.put(key, fromRNArray(from.getArray(key)));
          break;
      }
    }

    return to;
  }

  public static void append(WritableMap to, String name, Object value) {
    if (value != null) {
      if (WritableMap.class.isAssignableFrom(value.getClass())) {
        to.putMap(name, (WritableMap) value);
      } else if (value.getClass().isArray()) {
        to.putArray(name, toRNArray((Object[]) value));
      } else if (List.class.isAssignableFrom(value.getClass())) {
        to.putArray(name, toRNArray((List) value));
      } else if (value instanceof Boolean) {
        to.putBoolean(name, (Boolean) value);
      } else if (value instanceof Double) {
        to.putDouble(name, (Double) value);
      } else if (value instanceof Integer) {
        to.putInt(name, (Integer) value);
      } else if (value instanceof String) {
        to.putString(name, (String) value);
      } else {
        WritableMap v = toRNMap(value);
        if (v != null) {
          to.putMap(name, v);
        }
      }
    }
  }

  public static void append(WritableArray to, Object value) {
    if (value == null) {
      to.pushNull();
    } else if (WritableMap.class.isAssignableFrom(value.getClass())) {
      to.pushMap((WritableMap) value);
    } else if (value instanceof Boolean) {
      to.pushBoolean((Boolean) value);
    } else if (value instanceof Double) {
      to.pushDouble((Double) value);
    } else if (value instanceof Integer) {
      to.pushInt((Integer) value);
    } else if (value instanceof String) {
      to.pushString((String) value);
    } else if (value.getClass().isArray()) {
      to.pushArray(toRNArray((Object[]) value));
    } else if (List.class.isAssignableFrom(value.getClass())) {
      to.pushArray(toRNArray((List) value));
    } else {
      WritableMap writableMap = toRNMap(value);
      if (to != null) {
        to.pushMap(writableMap);
      }
    }
  }


  private static WritableMap readJsonObject(JSONObject jsonObject) throws JSONException {
    WritableMap to = createMap();
    Iterator iterator = jsonObject.keys();
    while (iterator.hasNext()) {
      String key = (String) iterator.next();
      Object value = jsonObject.get(key);
      if (value instanceof Float || value instanceof Double) {
        to.putDouble(key, jsonObject.getDouble(key));
      } else if (value instanceof Boolean) {
        to.putBoolean(key, jsonObject.getBoolean(key));
      }  else if (value instanceof Number) {
        to.putInt(key, jsonObject.getInt(key));
      } else if (value instanceof String) {
        to.putString(key, jsonObject.getString(key));
      } else if (value instanceof JSONObject) {
        to.putMap(key, readJsonObject(jsonObject.getJSONObject(key)));
      } else if (value instanceof JSONArray) {
        to.putArray(key, readJsonArray(jsonObject.getJSONArray(key)));
      }
    }

    return to;
  }

  private static WritableArray readJsonArray(JSONArray jsonArray) throws JSONException {
    WritableArray to = createArray();
    for (int i = 0; i < jsonArray.length(); i++) {
      Object value = jsonArray.get(i);
      if (value instanceof Float || value instanceof Double) {
        to.pushDouble(jsonArray.getDouble(i));
      } else if (value instanceof Number) {
        to.pushInt(jsonArray.getInt(i));
      } else if (value instanceof Boolean) {
        to.pushBoolean(jsonArray.getBoolean(i));
      } else if (value instanceof String) {
        to.pushString(jsonArray.getString(i));
      } else if (value instanceof JSONObject) {
        to.pushMap(readJsonObject(jsonArray.getJSONObject(i)));
      } else if (value instanceof JSONArray) {
        to.pushArray(readJsonArray(jsonArray.getJSONArray(i)));
      } else if (value == JSONObject.NULL) {
        to.pushNull();
      }
    }
    return to;
  }

  /**
   * Les implémentations de Arguments.create[Array|Map] sont natives.
   * On utilise les versions Java lors des tests.
   */
  public static final boolean javaOnlyForTests = false;

  private static WritableArray createArray() {
    if (javaOnlyForTests) {
      return new JavaOnlyArray();
    } else {
      return Arguments.createArray();
    }
  }

  private static WritableMap createMap() {
    if (javaOnlyForTests) {
      return new JavaOnlyMap();
    } else {
      return Arguments.createMap();
    }
  }

  public static JSONObject convertMapToJson(ReadableMap readableMap) {
    try {
      JSONObject object = new JSONObject();
      ReadableMapKeySetIterator iterator = readableMap.keySetIterator();
      while (iterator.hasNextKey()) {
        String key = iterator.nextKey();
        switch (readableMap.getType(key)) {
          case Null:
            object.put(key, JSONObject.NULL);
            break;
          case Boolean:
            object.put(key, readableMap.getBoolean(key));
            break;
          case Number:
            object.put(key, readableMap.getDouble(key));
            break;
          case String:
            object.put(key, readableMap.getString(key));
            break;
          case Map:
            object.put(key, convertMapToJson(readableMap.getMap(key)));
            break;
          case Array:
            object.put(key, convertArrayToJson(readableMap.getArray(key)));
            break;
        }
      }
      return object;
    } catch (JSONException e) {
      Log.e(TAG, "convertMapToJson: can't convert map : " + e.getMessage());
      return new JSONObject();
    }
  }

  private static JSONArray convertArrayToJson(ReadableArray readableArray) throws JSONException {
    JSONArray array = new JSONArray();
    for (int i = 0; i < readableArray.size(); i++) {
      switch (readableArray.getType(i)) {
        case Null:
          break;
        case Boolean:
          array.put(readableArray.getBoolean(i));
          break;
        case Number:
          array.put(readableArray.getDouble(i));
          break;
        case String:
          array.put(readableArray.getString(i));
          break;
        case Map:
          array.put(convertMapToJson(readableArray.getMap(i)));
          break;
        case Array:
          array.put(convertArrayToJson(readableArray.getArray(i)));
          break;
      }
    }
    return array;
  }

  public static List<HashMap<String, Object>> parseMarkers(ReadableArray markers) {
    List<HashMap<String, Object>> markersMap = new ArrayList<>();
    for (int i = 0; i < markers.size(); i++) {
      if (markers.getMap(i).hasKey("position")) {
        HashMap<String, Object> marker = new HashMap<>();
        marker.put("position", objectFromRNMap(markers.getMap(i).getMap("position")));
        if (markers.getMap(i).hasKey("markerName")) {
          marker.put("markerName", markers.getMap(i).getString("markerName"));
        }
        markersMap.add(marker);
      }
    }
    return markersMap;
  }
  public static HashMap<String, Style> parsePlaceStyles(ReadableArray placeStyles) {
    HashMap<String, Style> placeStylesMap = new HashMap<>();
    for (int i = 0; i < placeStyles.size(); i++) {
      if (placeStyles.getMap(i).hasKey("style")) {
        Style style = (Style) objectFromRNMap(placeStyles.getMap(i).getMap("style"));
        if (placeStyles.getMap(i).hasKey("placeId")) {
          String placeId = placeStyles.getMap(i).getString("placeId");
          placeStylesMap.put(placeId, style);
        }
      }
    }
    return placeStylesMap;
  }
  public static Bitmap parseBitmap(String iconBase64){
    int base64Index = iconBase64.indexOf("base64,");
    String encodedImage = iconBase64.substring(base64Index + 7);
    byte[] decodedString = Base64.decode(encodedImage, Base64.DEFAULT);
    return BitmapFactory.decodeByteArray(decodedString, 0, decodedString.length);
  }

  public static WritableMap serialize(OfflineRegion offlineRegion) {
    WritableMap writableMap = new WritableNativeMap();
    try {
      writableMap.putMap("venue",readJsonObject(Serializer.serializeVenue((Venue) offlineRegion.getVenue())));
      writableMap.putMap("universe",readJsonObject(Serializer.serializeUniverse((Universe) offlineRegion.getUniverse())));
      writableMap.putDouble("minZoom",offlineRegion.getMinZoom());
      writableMap.putDouble("maxZoom",offlineRegion.getMaxZoom());
    } catch (JSONException e) {
      e.printStackTrace();
    }
    return writableMap;
  }
}
