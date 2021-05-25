package com.mapwize;

import android.util.Log;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import androidx.annotation.Nullable;
import okhttp3.Cookie;
import okhttp3.CookieJar;
import okhttp3.Headers;
import okhttp3.HttpUrl;

public class CookieJarContainer implements com.facebook.react.modules.network.CookieJarContainer {

  public static final String TAG = CookieJarContainer.class.getName();
  @Nullable
  private CookieJar cookieJar = null;

  public CookieJarContainer(@Nullable CookieJar cookieJar) {
    this.cookieJar = cookieJar;
  }

  @Override
  public void setCookieJar(CookieJar cookieJar) {
    Log.w(TAG, "Trying to replace CookieJar");
//    this.cookieJar = cookieJar;
  }

  @Override
  public void removeCookieJar() {
    this.cookieJar = null;
  }

  @Override
  public void saveFromResponse(HttpUrl url, List<Cookie> cookies) {
    if (cookieJar != null) {
      cookieJar.saveFromResponse(url, cookies);
    }
  }

  @Override
  public List<Cookie> loadForRequest(HttpUrl url) {
    if (cookieJar != null) {
      List<Cookie> cookies = cookieJar.loadForRequest(url);
      ArrayList<Cookie> validatedCookies = new ArrayList<>();
      for (Cookie cookie : cookies) {
        try {
          Headers.Builder cookieChecker = new Headers.Builder();
          cookieChecker.add(cookie.name(), cookie.value());
          validatedCookies.add(cookie);
        } catch (IllegalArgumentException ignored) {
        }
      }
      return validatedCookies;
    }
    return Collections.emptyList();
  }
}
