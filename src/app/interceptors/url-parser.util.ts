import { ParsedRequestUrl, UriInfo } from './interfaces';

/**
 * Parses the request URL into a `ParsedRequestUrl` object.
 * Parsing depends upon certain values of `config`:
 *   `apiBase`, `host`, and `urlRoot`.
 *
 * Configuring the `apiBase` yields the most interesting changes to `parseRequestUrl` behavior:
 *   When apiBase=undefined and url='http://localhost/api/collection/42'
 *     {base: 'api/', collectionName: 'collection', id: '42', ...}
 */
export function parseRequestUrl(url: string, config: {
  /**
   * The base path to the api, e.g., 'api/'.
   * If not specified than `parseRequestUrl` assumes it is the first path segment
   * in the request.
   */
  apiBase?: string,
  /**
   * host for this service, e.g., 'rengular.js.org'
   */
  host?: string,
  /**
   * root path _before_ any API call
   */
  rootPath?: string,
}): ParsedRequestUrl {
  try {
    const loc = getLocation(url);
    let drop = (config.rootPath || '').length;
    let urlRoot = '';
    if (loc.host !== config.host) {
      // url for a server on a different host!
      // assume it's collection is actually here too.
      drop = 1; // the leading slash
      urlRoot = loc.protocol + '//' + loc.host + '/';
    }
    const path = loc.path.substring(drop);
    const pathSegments = path.split('/');
    let segmentIx = 0;
    // apiBase: the front part of the path devoted to getting to the api route
    // Assumes first path segment if no config.apiBase
    // else ignores as many path segments as are in config.apiBase
    // Does NOT care what the api base chars actually are.
    let apiBase: string;
    if (!config.apiBase) {
      apiBase = pathSegments[segmentIx++];
    } else {
      apiBase = removeTrailingSlash(config.apiBase.trim());
      if (apiBase) {
        segmentIx = apiBase.split('/').length;
      } else {
        segmentIx = 0; // no api base at all; unwise but allowed
      }
    }
    apiBase += '/';
    let collectionName = pathSegments[segmentIx++];
    // ignore anything after a '.' (e.g., the "json" in "customers.json")
    collectionName = collectionName && collectionName.split('.')[0];
    const id = pathSegments[segmentIx++];
    const query = createQueryMap(loc.query);
    const resourceUrl = urlRoot + apiBase + collectionName + '/';
    return { apiBase, collectionName, id, query, resourceUrl };
  } catch (error) {
    throw new Error(`unable to parse url '${url}'; original error: ${error.message}`);
  }
}

/**
 * Get location info from a url, even on server where `document` is not defined
 */
function getLocation(url: string) {
  if (!url.startsWith('http')) {
    // get the document iff running in browser
    const doc: Document = (typeof document === 'undefined') ? undefined : document;
    // add host info to url before parsing. Use a fake host when not in browser
    const base = doc ? doc.location.protocol + '//' + doc.location.host : 'http://rengular.js.org';
    url = url.startsWith('/') ? base + url : base + '/' + url;
  }
  return parseUri(url);
}

/** Return information (urlInfo) about a URI */
function parseUri(str: string): UriInfo {
  // Adapted from parseuri package - http://blog.stevenlevithan.com/archives/parseuri
  // tslint:disable-next-line:max-line-length
  const URL_REGEX = /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;
  const m = URL_REGEX.exec(str);
  const uri: UriInfo = {
    source: '',
    protocol: '',
    authority: '',
    userInfo: '',
    user: '',
    password: '',
    host: '',
    port: '',
    relative: '',
    path: '',
    directory: '',
    file: '',
    query: '',
    anchor: '',
  };
  const keys = Object.keys(uri);
  let i = keys.length;

  while (i--) {
    uri[keys[i]] = m[i] || '';
  }
  return uri;
}

/**
 * Return a search map from a location query/search string.
 *   * 'key1=v&key2=a&key1=a' --> { key1: ['v', 'a'], key2: ['a'] }
 */
function createQueryMap(search: string): Map<string, string[]> {
  const map = new Map<string, string[]>();
  if (search) {
    search.split('&').forEach(part => {
      const item = part.split('=');
      const cached = map.get(item[0]);
      if (cached) {
        cached.push(decodeURIComponent(item[1]));
      } else {
        map.set(item[0], [decodeURIComponent(item[1])]);
      }
    });
  }
  return map;
}

function removeTrailingSlash(path: string) {
  return path.replace(/\/$/, '');
}

/** Parse the id as a number. Return original value if not a number. */
export function parseId(collection: any[], collectionName: string, id: string): number | string {
  if (!isCollectionIdNumeric(collection, collectionName)) {
    // Can't confirm that `id` is a numeric type; don't parse as a number
    // or else `'42'` -> `42` and _get by id_ fails.
    return id;
  }
  const idNum = parseFloat(id);
  return isNaN(idNum) ? id : idNum;
}

/**
 * return true if can determine that the collection's `item.id` is a number
 * This implementation can't tell if the collection is empty so it assumes NO
 */
function isCollectionIdNumeric<T extends { id: any }>(
  collection: T[], collectionName: string): boolean {
  // collectionName not used now but override might maintain collection type information
  // so that it could know the type of the `id` even when the collection is empty.
  return !!(collection && collection[0]) && typeof collection[0].id === 'number';
}
