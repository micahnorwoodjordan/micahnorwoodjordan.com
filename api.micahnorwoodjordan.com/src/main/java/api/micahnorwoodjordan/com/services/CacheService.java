package api.micahnorwoodjordan.com.services;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.Cache;
import org.springframework.cache.CacheManager;

@Service
public class CacheService {
        @Autowired
        private CacheManager cacheManager;

        public void putInCache(String cacheName, String key, Object value) {
                Cache cache = cacheManager.getCache(cacheName);
                if (cache != null) {
                        cache.put(key, value);
                }
        }

        public boolean getFromCache(String cacheName, String key) {
                Cache cache = cacheManager.getCache(cacheName);
                if (cache != null) {
                        Cache.ValueWrapper wrapper = cache.get(key);
                        if (wrapper != null) {
                                return true;
                        }
                }
                return false;
        }
}
