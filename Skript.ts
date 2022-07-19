import md5 from 'md5'
import MMDate from './MMDate'

/**
 * 문자열 키와 문자열 값을 갖는 집합체
 */
interface RouteParameters {
  [name: string]: string
}

/**
 * 문자열 키와 임의형태의 값을 갖는 집합체
 */
interface QueryParameters {
  [name: string]: any
}

/**
 * Skript.addAction 호출에서 구현되는 옵션 데이터 인터페이스
 */
interface AddActionOption {
  /**
   * 이벤트 콜백 구현함수 (this는 이벤트가 걸린 대상을 참조하고, 인자값으로 addAction 에 해당되었던 대상 배열을 전달한다)
   */
  callback: (targets: any[]) => void

  /**
   * 이벤트 타입 : $enter, $esc 예약을 지원함. 콤마(,)로 concat 된 다수 이벤트 타입 지원
   */
  eventType?: string
}

/**
 * Skript.extract 호출에서 구현되는 옵션 데이터 인터페이스
 */
interface ExtractOption {
  /**
   * 반환 데이터 타입 (json, FormData)
   */
  dataType: string

  /**
   * 취합취득할 데이터 (전달된 셀렉터를 통해 지정되는 데이터가 있다면 덮어씌워짐)
   */
  appends: any
}

/**
 * interval을 관리하기 위한 구조체
 */
interface Tick {
  /**
   * interval 고유키
   */
  intervalId: number

  /**
   * tick 된 횟수
   */
  count: number

  /**
   * 종료여부를 확인하기 위한 테스터 메소드
   */
  tester: () => boolean

  /**
   * 종료시 실행할 메소드
   */
  endHandler: () => void

  /**
   * interval 동안 실행 될 함수
   */
  do: (action: (count?: number) => void) => Tick

  /**
   * 종료여부를 확인할 메소드
   */
  until: (tester: () => boolean) => Tick

  /**
   * 종료되었을 때 실행할 메소드 지정
   */
  whenEnd: (endHandler: () => void) => Tick
}

/**
 * 애플리케이션 스케일 클래스
 * @class
 * @classdesc 애플리케이션에서 사용하는 스크립트에 대한 관리를 총괄
 * @requires module:md5
 * @requires module:MMDate
 */
class Skript {
  /**
   * 쿼리스트링의 특정 키값을 조회
   * @param {string} paramKey - 조회할 쿼리스트링 키
   * @param {string=} querystring - 분석대상이 될 쿼리스트링 (미지정시 location.search 를 사용합니다)
   * @return {*} 해당 키에 해당하는 값
   * @example
   * ```javascript
   * // return 'best'
   * Skript.getQueryParam('key', '?key=best');
   *
   * // return [1, 2, 3.14]
   * Skript.getQueryParam('checks', '?checks[]=1&checks[]=2&checks[]=3.14');
   *
   * // return { name: "니코", age: 19, grade: 3 }
   * Skript.getQueryParam('data', '?data[name]=니코&data[age]=19&data[grade]=3');
   * // return '니코'
   * Skript.getQueryParam('data[name]', '?data[name]=니코&data[age]=19&data[grade]=3');
   * ```
   */
  getQueryParam(
    paramKey: string,
    querystring?: string,
  ): string | number | object {
    const query = querystring || location.search

    // 구조화 된 데이터 획득
    const params = this.getQueryParams(query)

    // 요청키를 분할 (data[name] 같은 형태로 들어오는 경우 data -> name 순차접근 위해)
    const sections = paramKey
      .split('[')
      .map((section) => section.replace(/\]$/, ''))
      .filter((section) => section !== '')

    // 뎁스에 따라 변하는 참조대상
    let target: any = params

    // 분할된 요청키를 순회하며 참조대상을 추적
    sections.forEach((section) => {
      if (target === null) {
        return
      }

      if (target[section] === null || target[section] === undefined) {
        target = null
      } else {
        target = target[section]
      }
    })

    // 순회 후 최종 참조대상값 반환
    return target === undefined ? null : target
  }

  /**
   * 쿼리스트링을 분해하여 반환
   * @param {string=} querystring - 분석대상이 될 쿼리스트링 (미지정시 location.search 를 사용합니다)
   * @return {QueryParameters} 쿼리 파라미터 구조체
   * @example
   * ```javascript
   * // return { checks: [1, 2, 3.14] }
   * Skript.getQueryParams('?checks[]=1&checks[]=2&checks[]=3.14');
   *
   * // return { data: { name: "니코", age: 19, grade: 3 }, link: 'http://google.com' }
   * Skript.getQueryParams('?data[name]=니코&data[age]=19&data[grade]=3&link=http://google.com');
   * ```
   */
  getQueryParams(querystring?: string): QueryParameters {
    const query = querystring || location.search

    // 쿼리 파라미터 구조체 변수 선언
    const params: QueryParameters = {}

    // 주어진 쿼리스트링을 분석
    query
      .replace(/[^?]*\?/, '')
      .split('&')
      .filter((pairString) => pairString !== '')
      .map((pairString) => {
        // 페어 문자열 분할(key=value -> ['key', 'value'])
        const indexOfFirstEqualChar = pairString.indexOf('=')
        const splited = [
          pairString.substring(0, indexOfFirstEqualChar),
          pairString.substring(indexOfFirstEqualChar + 1),
        ]

        let key = decodeURIComponent(splited[0])
        const value = splited[1] || ''

        // 키의 구조 확인([] 존재여부)
        let match = key.match(/\[([^\[\]]*)\]/)

        // 매칭되었다면 구조화
        if (match !== null && match.index) {
          // 구조체 키 / 나머지로 분할 (row[data][name] -> 'row' / '[data][name]')
          let slicedKey = key.substring(0, match.index)
          let restKey = key.substring(match.index)

          // 나머지가 [] 값이라면 최하위 뎁스라서 배열처리하면 됨
          if (restKey === '[]') {
            if (!params[slicedKey]) {
              params[slicedKey] = []
            }

            params[slicedKey] = params[slicedKey] as Array<any>

            // 값 지정
            params[slicedKey].push(this.formatQueryParamValue(value))
          } else {
            // 나머지가 [.*] 값이라면 객체처리함
            if (!params[slicedKey]) {
              params[slicedKey] = {}
            }

            // 나머지에서 매칭되는 모든 [.*] 값을 조회
            let matches = restKey.match(/\[([^\[\]]*)\]/g) || []

            // 동적으로 변하는 대상객체
            let targetObject = params[slicedKey]

            // 매칭된 모든 [.*] 값을 순회
            for (let index = 0; index < matches.length; index++) {
              // [, ] 를 잘라낸 키
              let cuttedKey: string | number = matches[index]
                .replace(/^\[/, '')
                .replace(/\]$/, '')

              // cuttedKey 값이 공백이라면 k[n][m][] 의 마지막 [] 부분인 것이므로 배열 생성하고 푸시해서 continue 처리해야함
              if (cuttedKey === '') {
                if (!targetObject || !Array.isArray(targetObject)) {
                  targetObject = []
                }

                if (value !== '') {
                  targetObject.push(this.formatQueryParamValue(value))
                }
                continue
              }

              // 해당 키 데이터 객체가 없으면 생성해주기
              if (!targetObject[cuttedKey]) {
                // 다음 match 가 존재하고 다음 match 가 [] 형태라면 배열로, 그 외에는 객체타입으로 선언
                if (
                  matches.length >= index + 1 &&
                  matches[index + 1] === '[]'
                ) {
                  targetObject[cuttedKey] = []
                } else {
                  targetObject[cuttedKey] = {}
                }
              }

              if (index === matches.length - 1) {
                // 순회가 마지막이면 값을 할당
                targetObject[cuttedKey] = this.formatQueryParamValue(value)
              } else {
                // 순회가 마지막이 아니면 대상객체를 지정
                targetObject = targetObject[cuttedKey]
              }
            }
          }
        } else {
          // 매칭 안 되었으면 바로 할당해주면 됨
          params[key] = this.formatQueryParamValue(value)
        }
      })

    // 할당 완료된 구조체 반환
    return params
  }

  /**
   * 쿼리파라미터 값을 타입유추하여 포맷팅
   * @param {string} value - 포맷팅 처리할 값
   * @return {(number | boolean | string)} 포맷팅 처리된 값
   * @ignore
   */
  private formatQueryParamValue(value: string): number | boolean | string {
    if (value === 'true') {
      return true
    } else if (value === 'false') {
      return false
    } else if (
      !value.match(/^0/) &&
      !value.match(/[^\d\.]/) &&
      !isNaN(Number.parseFloat(value)) &&
      value == Number.parseFloat(value).toString()
    ) {
      return Number.parseFloat(value)
    } else {
      return decodeURIComponent(value)
    }
  }

  /**
   * 객체 deep clone 메소드
   * @param {*} value 복사할 대상
   * @return {*} 복사된 결과
   * @example
   * ```javascript
   * var obj = {
   *    name: '니코',
   *    age: 19,
   *    subjects: ['수학', '과학', '미술'],
   *    address: {
   *      base: '기본주소',
   *      detail: '세부주소',
   *      postcode: '우편번호'
   *    },
   *    sayName: function () {
   *      alert(this.name);
   *    },
   * };
   *
   * // 참조복사
   * var refObj = obj;
   * // true
   * console.log(refObj === obj);
   *
   * // 클로닝
   * var cloneObj = Skript.clone(obj);
   * // false
   * console.log(cloneObj === obj);
   *
   * ```
   */
  public clone(value: any): any {
    if (value === null || typeof value !== 'object') return value

    var copy = value.constructor()

    for (var attr in value) {
      if (value.hasOwnProperty(attr)) {
        copy[attr] = this.clone(value[attr])
      }
    }

    return copy
  }

  /**
   * 화면 구성요소에 이벤트를 걸어주는 숏컷함수
   * @param {(string | HTMLElement | NodeList)} selector - 대상을 선택하는 기준
   * @param {Function(any): void | AddActionOption} args - 추가옵션
   * @param {HTMLElement | Document} baseElementOrDocument? 기준 엘리먼트
   * @example
   * ```javascript
   * // class-name 이라는 클래스를 가진 엘리먼트에 keyup(enter) 이벤트를 거치
   * Skript.addAction('.class-name', {
   *    eventType: '$enter',
   *    callback: function (targets) {
   *        // 콜백 스코프의 this는 이벤트가 걸린 타겟을 가리킨다
   *        console.log(targets.length, this.innerText);
   *    },
   * });
   *
   * // 축약형태(click 이벤트) 사용
   * Skript.addAction('document', function () {
   *    console.log('document clicked!');
   * });
   * ```
   */
  addAction(
    selector: string | HTMLElement | NodeList | Window | Document,
    args: Function | AddActionOption,
    baseElementOrDocument?: HTMLElement,
  ) {
    // 두 번째 인자가 함수라면 이벤트 타입이 클릭으로 고정되는 축약형 호출임 (원래 두 번째 인자는 { 이벤트 타입, 콜백 } 형태의 객체)
    let options =
      typeof args === 'function'
        ? ({
          callback: args as Function,
        } as AddActionOption)
        : args || ({} as AddActionOption)

    // 인자가 갖춰졌을 때에만 실행
    if (selector && options.callback) {
      // 콜백이 없으면 리턴
      if (!options.callback) {
        return
      }

      // 이벤트 타입은 기본적으로 클릭
      options.eventType = options.eventType || 'click'

      // 타겟 확정 (셀렉터는 문자열 또는 엘리먼트 형태로 넘어올 수 있음)
      const targets = this.getTargetsFromSelector(
        selector,
        baseElementOrDocument,
      )

      // 타겟 순회하면서 콜백 리스너를 거치
      for (var i = 0; i < targets.length; i++) {
        const target = targets[i]

        // 이벤트 타입이 다중으로 걸린 경우를 위해 순환 (ex: '$enter,click')
        const eventTypeArray = options.eventType.split(',')
        for (let j = 0; j < eventTypeArray.length; j++) {
          const eventType = eventTypeArray[j].trim()
          // $enter, $esc는 엔터키와 ESC키 누르는 것에 대한 축약형 이벤트타입
          if (eventType === '$enter') {
            target.addEventListener('keyup', function (
              this: any,
              event: KeyboardEvent,
            ) {
              if (event && event.key === 'Enter') {
                options.callback.call(this, targets)
              }
            })
          } else if (eventType === '$esc') {
            target.addEventListener('keyup', function (
              this: any,
              event: KeyboardEvent,
            ) {
              if (event && (event.key === 'Esc' || event.key === 'Escape')) {
                options.callback.call(this, targets)
              }
            })
          } else {
            target.addEventListener(eventType, function (this: any) {
              options.callback.call(this, targets)
            })
          }
        }
      }
    }
  }

  /**
   * 브라우저 구성요소에 이벤트를 실행하는 숏컷함수
   * @param {(string | HTMLElement | NodeList)} selector - 대상을 선택하는 기준
   * @param {Function(any): void} func - 실행할 함수 구현
   * @param {HTMLElement | Document} baseElementOrDocument? 기준 엘리먼트
   * @throws Error - 호출 인자값이 유효하지 않을 때 예외를 발생시킴
   * @example
   * ```javascript
   * Skript.runAction('[data-is-new="true"]', function (targets, index) {
   *    this.classList.add('new');
   *    console.log(targets.length);
   * });
   * ```
   */
  runAction(
    selector: string | HTMLElement | NodeList | Window | Document,
    func: Function,
    baseElementOrDocument?: HTMLElement,
  ) {
    if (selector && func && typeof func == 'function') {
      // 타겟 확정 (셀렉터는 문자열 또는 엘리먼트 형태로 넘어올 수 있음)
      const targets = this.getTargetsFromSelector(
        selector,
        baseElementOrDocument,
      )

      for (let i = 0; i < targets.length; i++) {
        const target = targets[i]
        func.call(target, targets, i)
      }
    } else {
      throw new Error('대상 선택기준이 없거나 실행할 함수가 없습니다.')
    }
  }

  /**
   * 사용자 지정 셀렉터로부터 대상을 반환
   * @param {*} selector - 셀렉터 (문자열, 엘리먼트 자체, 엘리먼트 대상, 윈도우 객체, 도큐먼트 객체 등)
   * @param {HTMLElement | Document} baseElementOrDocument? 기준 엘리먼트
   * @return {*} 셀렉팅 된 대상
   * @ignore
   */
  private getTargetsFromSelector(
    selector: string | HTMLElement | NodeList | Window | Document,
    baseElementOrDocument?: HTMLElement | Document,
  ): any {
    let targets
    if (selector instanceof HTMLElement) {
      targets = [selector]
    } else if (selector instanceof NodeList) {
      targets = selector
    } else if (selector === 'window' || selector === window) {
      targets = [window]
    } else if (selector === 'document' || selector === document) {
      targets = [document]
    } else if (typeof selector === 'string') {
      if (baseElementOrDocument instanceof HTMLElement) {
        targets = baseElementOrDocument.querySelectorAll(
          selector || 'temp.not-exist-selector',
        )
      } else {
        targets = document.querySelectorAll(
          selector || 'temp.not-exist-selector',
        )
      }
    } else {
      targets = selector
    }

    return targets
  }

  /**
   * 데이터 요소를 전달받아 쿼리스트링으로 변환하는 메소드
   * @param {*} obj - 대상 데이터
   * @returns {string} 쿼리스트링으로 만들어진 결과값
   * @example
   * ```javascript
   * // '?name=%EB%8B%88%EC%BD%94&address=&school_id=&is_student=true&check_rate=44.231324222'
   * Skript.querify({
   *       name: '니코', // value는 encodeURIComponent 적용된 문자열이 적용됨
   *       address: null,   // null은 빈 문자열로 치환됨
   *       school_id: undefined, // undefined는 빈 문자열로 치환됨
   *       is_student: true, // boolean 값은 'true' / 'false' 문자열로 치환됨
   *       check_rate: 44.231324222, // 숫자값은 그대로 문자열로 치환됨
   * });
   *
   * // '?hobbies[]=%EB%85%B8%EB%9E%98&hobbies[]=%EB%8C%84%EC%8A%A4&hobbies[]=%EC%9A%94%EB%A6%AC&subjects[]='
   * Skript.querify({
   *       hobbies: ['노래', '댄스', '요리'], // 배열은 hobbies[]=노래&hobbies[]=댄스&hobbies[]=요리 형태로 적용됨
   *       subjects: [], // 빈 배열은 subjects[]= 형태로 적용됨
   *       empty_obj: {}, // 빈 오브젝트는 추가하지 않음(이름이 없음)
   * });
   *
   * // 배열형태 요소를 처리하는 방식
   * // '?tests[][grade]=1&tests[][answers][]=1&tests[][answers][]=4&tests[][answers][]=3'
   * Skript.querify({
   *       tests: [
   *          {
   *            grade: 1,
   *            answers: [1, 4, 3],
   *            func: function () {}, // 함수는 포함되지 않음
   *          }
   *       ],
   * });
   *
   * // 중첩된 데이터를 다루는 방식
   * // '?extraInfo[circles][]=movie&extraInfo[circles][]=write&extraInfo[goal][target]=university&extraInfo[goal][targetDetail]=director&extraInfo[goal][availibity]=A'
   * Skript.querify({
   *       extraInfo: {
   *          circles: ['movie', 'write'],
   *          goal: {
   *            target: 'university',
   *            targetDetail: 'director',
   *            availibity: 'A'
   *          }
   *       },
   * });
   * ```
   */
  querify(obj: any): string {
    if (typeof obj === 'string') {
      return `?${obj}=`
    }

    // key=value 형태의 페어 문자열을 담아둘 변수 선언
    const pairs: any[] = []

    // 전달된 obj를 순회하며 페어 문자열 생성
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const element = obj[key]
        setPairString(pairs, key, element)
      }
    }

    // 페어 문자열 길이에 따라 반환값 조정
    return pairs.length > 0 ? `?${pairs.join('&')}` : ''

    /**
     * 페어 문자열을 세팅하는 내부메소드
     * @param {*} _pairs 페어 문자열을 저장할 변수
     * @param {string} _key 페어 문자열의 키
     * @param {*} _element 페어 문자열의 값이 될 데이터 요소
     */
    function setPairString(_pairs: any, _key: string, _element: any) {
      if (_element !== null && typeof _element === 'object') {
        // 전달된 데이터 요소가 null이 아닌 object 타입이라면
        if (Array.isArray(_element)) {
          // 데이터 요소가 배열 형태일 때
          if (_element.length === 0) {
            // 배열의 길이가 0이라면 key만 세팅
            _pairs.push(`${_key}[]=`)
          } else {
            // 배열의 요소를 순회
            _element.forEach((val) => {
              if (val !== null && typeof val === 'object') {
                if (Array.isArray(val)) {
                  // 재귀호출
                  setPairString(_pairs, `${_key}[]`, val)
                } else {
                  // 예외케이스 : Date, MMDate
                  if (isSpecialElement(val)) {
                    _pairs.push(
                      `${_key}=${encodeURIComponent(
                        getSpecialElementValue(_element),
                      )}`,
                    )
                  } else {
                    for (const key in val) {
                      if (val.hasOwnProperty(key)) {
                        const nestedElement = val[key]
                        setPairString(
                          _pairs,
                          `${_key}[][${key}]`,
                          nestedElement,
                        )
                      }
                    }
                  }
                }
              } else {
                if (typeof val === 'function') {
                  return
                }

                if (isSpecialElement(val)) {
                  _pairs.push(
                    `${_key}[]=${encodeURIComponent(
                      getSpecialElementValue(val),
                    )}`,
                  )
                } else {
                  _pairs.push(
                    `${_key}[]=${encodeURIComponent(
                      returnBlankIfNullOrUndefined(val),
                    )}`,
                  )
                }
              }
            })
          }
        } else {
          if (isSpecialElement(_element)) {
            _pairs.push(
              `${_key}=${encodeURIComponent(getSpecialElementValue(_element))}`,
            )
          } else {
            // 데이터 요소가 객체 형태일 때
            for (const key in _element) {
              if (_element.hasOwnProperty(key)) {
                const nestedElement = _element[key]
                setPairString(_pairs, `${_key}[${key}]`, nestedElement)
              }
            }
          }
        }
      } else {
        if (typeof _element === 'function') {
          return
        }
        if (isSpecialElement(_element)) {
          _pairs.push(
            `${_key}=${encodeURIComponent(getSpecialElementValue(_element))}`,
          )
        } else {
          // 데이터 요소가 객체 또는 배열이 아닐 때
          _pairs.push(
            `${_key}=${encodeURIComponent(
              returnBlankIfNullOrUndefined(_element),
            )}`,
          )
        }
      }
    }

    // 주어진 값이 null 또는 undefined 라면 공백 문자열을, 그렇지 않다면 주어진 값 그대로를 반환하는 메소드
    function returnBlankIfNullOrUndefined(val: any): any {
      if (val === null || val === undefined) {
        return ''
      } else {
        return val
      }
    }

    // 주어진 값이 특별취급해야하는 값인지 체크하는 메소드
    function isSpecialElement(val: any): boolean {
      if (!val) {
        return false
      }

      // native Date 또는 MMDate 객체 체크
      return (
        val.constructor === Date ||
        (typeof val.getDateInstance === 'function' &&
          val.getDateInstance() &&
          val.getDateInstance().constructor === Date)
      )
    }

    // 특별취급해야하는 값을 보정하는 함수
    function getSpecialElementValue(val: any): any {
      if (val === null || val === undefined) {
        return ''
      }

      if (val.constructor === Date) {
        // 네이티브 Date 값 처리
        const year = val.getFullYear()
        if (isNaN(year)) {
          return 'Invalid Date'
        }

        let month = '' + (val.getMonth() + 1)
        if (month.length < 2) month = '0' + month

        let date = '' + val.getDate()
        if (date.length < 2) date = '0' + date

        let hour = '' + val.getHours()
        if (hour.length < 2) hour = '0' + hour

        let minute = '' + val.getMinutes()
        if (minute.length < 2) minute = '0' + minute

        let second = '' + val.getSeconds()
        if (second.length < 2) second = '0' + second

        return `${year}-${month}-${date} ${hour}:${minute}:${second}`
      } else if (
        // MMDate 값 체크
        typeof val.getDateInstance === 'function' &&
        val.getDateInstance() &&
        val.getDateInstance().constructor === Date
      ) {
        return returnBlankIfNullOrUndefined(val)
      } else {
        // 그 외 기본처리
        return returnBlankIfNullOrUndefined(val)
      }
    }
  }

  /**
   * 쿼리스트링을 분석해 해당하는 페이지 요소에 채워줌
   * @param { {[string]: (string, any, number) => void} } customHandlers 개별 컨트롤 핸들러
   * @param {string=} querystring - 분석대상이 될 쿼리스트링 (미지정시 location.search 를 사용합니다)
   * @example
   * ```javascript
   * // 화면에서 name="checks[]" 속성을 가진 요소를 찾아 순서대로 1, 2, 3.14 값을 대입
   * // 화면에서 name="name" 속성을 가진 요소를 찾아 '니코' 값을 대입
   * // 화면에서 name="age" 속성을 가진 요소를 찾아 '19' 값을 대입
   * Skript.syncQueryParamsToPage(null, '?checks[]=1&checks[]=2&checks[]=3.14&name=니코&age=19');
   *
   * // checks[] 항목에 대해 커스텀 핸들러 적용
   * // 'checks[]'
   * // '100'
   * // '1'
   * // 'checks[]'
   * // '200'
   * // '2'
   * // 'checks[]'
   * // '3.14'
   * // '3'
   * // *** 커스텀 핸들러가 지정된 경우 페이지에 값을 적용하지 않습니다 ***
   * Skript.syncQueryParamsToPage({
   *    'checks[]': function (name, value, seq) {
   *        console.log(name); // 전달한 항목명('checks[]')
   *        console.log(value); // 해당 키의 값(1)
   *        console.log(seq); // 해당 키의 순번(배열인 경우 seq 1, 2, 3 순서로 3번 호출됨)
   *    },
   * }, '?checks[]=100&checks[]=200&checks[]=3.14&name=니코&age=19');
   * ```
   */
  syncQueryParamsToPage(
    customHandlers?: {
      [name: string]: (name: string, value: any, seq: number) => void
    },
    querystring?: string,
  ) {
    // 분석할 쿼리 파라미터 문자열 획득
    const query = querystring || location.search

    // 쿼리 파라미터 문자열을 섹션별 분할
    const sections = query.replace(/^\?/, '').split('&')

    // 가변길이 배열 형태 파라미터를 처리하기 위한 카운팅 객체 선언
    const matchCounts: any = {}

    // 분할된 섹션을 key value 페어로 나눠 각각 처리
    sections
      .map((section) => section.split('='))
      .forEach((pair) => {
        // 키 (폼 요소의 name 에 해당)
        const key = decodeURIComponent(pair[0])
        // 해당 키의 값
        const value = decodeURIComponent(decodeURI(pair[1]).replace(/\+/g, ' '))

        // 카운팅 객체값 적용
        if (matchCounts[key]) {
          matchCounts[key] = matchCounts[key] + 1
        } else {
          matchCounts[key] = 1
        }

        if (customHandlers) {
          // 커스텀 핸들러 와일드카드 처리
          for (const handlerKey in customHandlers) {
            if (
              customHandlers.hasOwnProperty(handlerKey) &&
              typeof customHandlers[handlerKey] === 'function'
            ) {
              const reg = new RegExp(
                handlerKey
                  .split('[*]')
                  .map((section) =>
                    section.replace(/\[/g, '\\[').replace(/\]/g, '\\]'),
                  )
                  .join('\\[([^\\]]*)\\]') + '$',
              )

              if (key.match(reg)) {
                return customHandlers[handlerKey](key, value, matchCounts[key])
              }
            }
          }
        }

        // 커스텀 핸들러가 있다면 실행
        if (
          customHandlers &&
          customHandlers[key] &&
          typeof customHandlers[key] === 'function'
        ) {
          return customHandlers[key](key, value, matchCounts[key])
        }

        // 해당 키를 가진 폼 요소를 조회
        const matchElements = document.querySelectorAll(`[name="${key}"]`)
        let matchElement = null

        // 일치하는 폼 요소의 갯수가 다수라면 배열 형태로 처리함
        if (matchElements.length > 1) {
          matchElement = matchElements[matchCounts[key] - 1]
        } else {
          matchElement = matchElements[0]
        }

        // 폼 요소 타입별 처리
        if (matchElement instanceof HTMLInputElement) {
          // input 타입 요소의 타입별 처리
          switch (matchElement.getAttribute('type')) {
            case 'checkbox':
            case 'radio':
              let target = document.querySelector(
                `[name="${key}"][value="${value}"]`,
              )
              if (target instanceof HTMLInputElement) {
                target.checked = true
              }
              break

            default:
              matchElement.value = value
              break
          }
        } else if (matchElement instanceof HTMLSelectElement) {
          // select 타입 요소의 처리
          matchElement.value = value
        } else if (matchElement instanceof HTMLTextAreaElement) {
          // textarea 타입 요소의 처리
          matchElement.value = value
        }
      })
  }

  /**
   *
   * @param {string} selector 대상 엘리먼트를 특정할 수 있는 CSS 셀렉터
   * @param {ExtractOption=} options 추가옵션
   * @returns {(object | FormData)} 추출된 결과데이터
   * @throws Error - 대상 엘리먼트가 존재하지 않거나 데이터 타입이 유효하지 않으면 예외를 발생시킴
   * @example
   * ```html
   * <form id="form">
   *    <input type="hidden" name="grade" value="3" />
   *    <input type="text" name="age" value="19" />
   * </form>
   * ```
   * ```javascript
   * // return { name: '니코', age: '19', grade: '3' }
   * Skript.extract('#form', {
   *    dataType: 'json',
   *    appends: {
   *        name: '니코',
   *        age: 12
   *    }
   * })
   * ```
   */
  extract(selector: string, options?: ExtractOption): object | FormData {
    // 추출 대상 엘리먼트를 획득
    const element = document.querySelector(selector)

    // 기본 옵션 세팅
    const opt = options || {
      dataType: 'json',
      appends: {},
    }

    // 추출 대상 엘리먼트가 존재하지 않으면 예외처리
    if (element === null) {
      throw new Error('대상 엘리먼트가 존재하지 않습니다.')
    } else if (typeof opt.dataType !== 'string') {
      throw new Error('반환 데이터 타입이 유효하지 않습니다')
    }

    if (opt.dataType.toLowerCase() === 'json') {
      return this.extractJson(element!, opt.appends)
    } else if (opt.dataType.toLowerCase() === 'formdata') {
      return this.extractFormData(element!, opt.appends)
    } else {
      throw new Error('반환 데이터 타입이 유효하지 않습니다')
    }
  }

  /**
   * 엘리먼트에서 JavaScript Object 인스턴스 추출 (extract 함수의 타입 축약형)
   * @param   {Element} element 폼데이터 인스턴스를 추출할 엘리먼트
   * @param   {*} appends 취합할 데이터(같은 이름 데이터가 element 하위에 있는 경우 appends 에 있는 값은 덮어씌워짐)
   * @param   {boolean} includeEmptyValue 빈 값을 포함시킬지 여부
   * @return  Object
   * @example
   * ```javascript
   * Skript.extractJson(document.querySelector('#form'), {
   *    name: '니코',
   *    age: 19
   * })
   * ```
   **/
  extractJson(element: Element, appends?: any, includeEmptyValue?: boolean) {
    // 대상 엘리먼트 하위 name 속성을 가진 요소를 조회
    const namedElements = element.querySelectorAll('[name]')

    // 1. 추출결과 객체로 폼데이터 생성
    let extracted = appends || {}

    // 2. 자식 엘리멘트 순회
    for (let i = 0; i < namedElements.length; i++) {
      // 2-1. 자식 엘리먼트
      const el = namedElements[i]

      // 2-2. 자식 엘리먼트 name 값, 다중 name 여부 획득
      let elName = el.getAttribute('name') || ''
      const isMultiple = elName.indexOf('[]') !== -1
      elName = elName.replace('[]', '')

      // 2-3. 자식 엘리먼트 유형에 따른 분기 후 데이터 할당
      if (
        el instanceof HTMLSelectElement &&
        (includeEmptyValue || (el.value && el.value != ''))
      ) {
        // 2-3-1. select 엘리먼트는 value 로 할당
        extracted[elName] = el.value
      } else if (el instanceof HTMLInputElement) {
        switch ((el.getAttribute('type') || '').toLowerCase()) {
          // 2-3-2. checkbox 타입은 다중 name 일 경우 배열로, 단일 name 일 경우 단일 값으로 할당
          case 'checkbox':
            if (el.checked) {
              if (isMultiple) {
                extracted[elName] = Array.isArray(extracted[elName])
                  ? extracted[elName]
                  : ([] as Array<any>)
                extracted[elName].push(el.value)
              } else {
                extracted[elName] = el.value
              }
            }
            break
          // 2-3-3. radio 타입은 checked 된 값을 전달
          case 'radio':
            if (el.checked) {
              extracted[elName] = el.value
            }
            break
          // 2-3-4. text, password, email 타입은 값 그대로를 전달
          case 'text':
          case 'password':
          case 'email':
          case 'hidden':
          case 'search':
          case 'number':
          case 'tel':
          case 'date':
          case 'datetime':
          case 'datetime-local':
            if (includeEmptyValue || (el.value && el.value != '')) {
              if (isMultiple) {
                extracted[elName] = Array.isArray(extracted[elName])
                  ? extracted[elName]
                  : ([] as Array<any>)
                extracted[elName].push(el.value)
              } else {
                extracted[elName] = el.value
              }
            }
            break
          // 2-3-6. file 타입 json 변환은 .. 
          case 'file':
            break
          default:
        }
      } else if (el instanceof HTMLTextAreaElement) {
        if (includeEmptyValue || (el.value && el.value != '')) {
          extracted[elName] = el.value
        }
      }
    }

    return extracted
  }

  /**
   * @brief   엘리먼트에서 FormData 인스턴스 추출 (extract 함수의 타입 축약형)
   * @param   {Element} element 폼데이터 인스턴스를 추출할 엘리먼트
   * @param   {*} appends 취합할 데이터(같은 이름 데이터가 element 하위에 있는 경우 appends 에 있는 값은 덮어씌워짐)
   * @return  FormData
   * @example
   * ```javascript
   * Skript.extractFormData(document.querySelector('#form'), {
   *    name: '니코',
   *    age: 19
   * })
   * ```
   **/
  extractFormData(
    element: Element,
    appends?: any,
    fileHandler?: (
      fd: FormData,
      name: string,
      files: FileList | null,
      element: HTMLInputElement,
    ) => void,
  ) {
    // 대상 엘리먼트 하위 name 속성을 가진 요소를 조회
    const namedElements = element.querySelectorAll('[name]')

    // 1. 추출결과 객체로 폼데이터 생성
    let extracted = appends || {}
    let formData = new FormData()

    for (let key in extracted) {
      formData.append(key, extracted[key])
    }

    let fileCount = 0
    let fileOfContainer: any = {}

    // 2. 자식 엘리멘트 순회
    for (let i = 0; i < namedElements.length; i++) {
      // 2-1. 자식 엘리먼트
      const el = namedElements[i]

      // 2-2. 자식 엘리먼트 name 값, 다중 name 여부 획득
      let elName = el.getAttribute('name') || ''
      const isMultiple = elName.indexOf('[]') !== -1
      //   elName = elName.replace('[]', '')

      // 2-3. 자식 엘리먼트 유형에 따른 분기 후 데이터 할당
      if (el instanceof HTMLSelectElement && el.value && el.value != '') {
        // 2-3-1. select 엘리먼트는 value 로 할당
        formData.append(elName, el.value)
      } else if (
        el instanceof HTMLInputElement ||
        Object.getPrototypeOf(el).toString() == '[object HTMLInputElement]'
      ) {
        const inputElement = el as HTMLInputElement

        switch ((el.getAttribute('type') || '').toLowerCase()) {
          // 2-3-2. checkbox 타입은 다중 name 일 경우 배열로, 단일 name 일 경우 단일 값으로 할당
          case 'checkbox':
            if (inputElement.checked) {
              if (isMultiple) {
                formData.append(elName, inputElement.value)
              } else {
                formData.delete(elName)
                formData.append(elName, inputElement.value)
              }
            }
            break
          // 2-3-3. radio 타입은 checked 된 값을 전달
          case 'radio':
            if (inputElement.checked) {
              formData.append(elName, inputElement.value)
            }
            break
          // 2-3-4. text, password, email 타입은 값 그대로를 전달
          case 'text':
          case 'password':
          case 'email':
          case 'hidden':
          case 'search':
          case 'tel':
          case 'date':
          case 'datetime':
          case 'datetime-local':
            if (inputElement.value && inputElement.value != '') {
              formData.append(elName, inputElement.value)
            }
            break
          // 2-3-6. file 타입은 추후 보완
          case 'file':
            if (inputElement.files) {
              fileCount += inputElement.files.length
            }

            if (fileHandler) {
              fileHandler(formData, elName, inputElement.files, inputElement)
            } else {
              if (inputElement.files && inputElement.files.length > 0) {
                if (inputElement.files.length > 1) {
                  for (
                    let index = 0;
                    index < inputElement.files.length;
                    index++
                  ) {
                    const file = inputElement.files[index]
                    formData.append(`${elName}[${index}]`, file)
                  }
                } else {
                  formData.append(elName, inputElement.files[0])
                }
              }
            }
            break
          default:
        }
      } else if (el instanceof HTMLTextAreaElement) {
        if (el.value && el.value != '') {
          formData.append(elName, el.value)
        }
      } else if (el instanceof HTMLElement && el.hasAttribute('contenteditable')) {
        formData.append(elName, el.innerText)
      }
    }

    if (fileCount > 0) {
      // 3. 파일이 존재하면 관련 메타데이터 생성
      let metadata = {
        totalCount: fileCount,
        files: {} as any,
      }

      for (let formName in fileOfContainer) {
        metadata.files[formName] = []
        for (let i = 0; i < fileOfContainer[formName].length; i++) {
          const info = fileOfContainer[formName][i]
          metadata.files[formName].push({
            isNew: info instanceof File,
            url:
              info instanceof File
                ? null
                : (info.name || '').replace(/\?.*/, ''),
          })
        }
      }

      formData.append('metadata_files', JSON.stringify(metadata))
    }

    return formData
  }

  /**
   * setTimeout 랩핑함수
   * @param {number} second - 지연시킬 초(second)
   * @returns {Promise<number>}
   * @example
   * ```javascript
   * Skript.wait(5)
   *    .then(timeoutId => {
   *        console.log('5초 후 출력됩니다. timeout Id : ' + timeoutId);
   *        return false;
   *    })
   *    .then(isComplete => {
   *        if (isComplete !== true) {
   *            throw new Error('예외 발생시 catch 처리됨');
   *        }
   *
   *        console.log('이 구문은 실행되지 않습니다.');
   *    })
   *    .catch(err => {
   *        // Error: 예외 발생시 catch 처리됨
   *        console.log(err);
   *    });
   * ```
   */
  wait(second: number): Promise<number> {
    return new Promise((resolve) => {
      const timeoutId = window.setTimeout(() => {
        resolve(timeoutId)
      }, second * 1000)
    })
  }

  /**
   * 지정한 범위의 숫자 범위 배열을 생성
   * @param {number} start 시작값
   * @param {number} end 종료값
   * @returns {number[]}
   * @throws {Error} 시작값 또는 종료값이 누락되었거나 숫자가 아니거나 종료값이 시작값보다 작으면 예외를 발생시킴
   * @example
   * ```javascript
   * var arr = Skript.range(1, 5);
   *
   * // [1, 2, 3, 4, 5]
   * console.log(arr)
   * ```
   */
  range(start: number, end: number): number[] {
    if (typeof start !== 'number') {
      throw new Error('시작값이 없거나 숫자가 아닙니다.')
    } else if (typeof end !== 'number') {
      throw new Error('종료값이 없거나 숫자가 아닙니다.')
    } else if (end < start) {
      throw new Error('시작값이 종료값보다 큽니다.')
    }

    const arr: number[] = []

    for (let num = start; num <= end; num++) {
      arr.push(num)
    }

    return arr
  }

  /**
   * 지정된 범위 내의 무작위 수를 반환하는 함수
   * @param {number} min 최소값
   * @param {number} max 최대값
   * @param {boolean=} isFloor 소수점 버림여부
   * @throws {Error} 최소값 또는 최대값이 누락되었거나 숫자가 아니거나 최대값이 최소값보다 작으면 예외를 발생시킴
   * @example
   * ```javascript
   * // -10과 0 사이의 무작위 정수를 반환
   * Skript.random(-10, 0);
   *
   * // -10과 0 사이의 무작위 수를 반환
   * Skript.random(-10, 0, false);
   * ```
   */
  random(min: number, max: number, isFloor: boolean = true): number {
    if (typeof min !== 'number') {
      throw new Error('최소값이 없거나 숫자가 아닙니다.')
    } else if (typeof max !== 'number') {
      throw new Error('최대값이 없거나 숫자가 아닙니다.')
    } else if (max < min) {
      throw new Error('최소값이 최대값보다 큽니다.')
    }

    const interval = max - min + 1
    return (
      (isFloor === true
        ? Math.floor(Math.random() * interval)
        : Math.random() * interval) + min
    )
  }

  /**
   * 배열을 특정 키값으로 그룹핑
   * @param {any[]} arr 대상 배열
   * @param {string} keyName 키 이름
   * @param {(keyValue: string) => string} keyModifier 키값을 재구성하는 함수
   * @returns {{[keyValue: string]: any}}
   * @example
   * ```javascript
   * var arrayObj = []
   *
   * for (let index = 0; index < 1000; index++) {
   *   arrayObj.push({
   *     orderId: index,
   *     name: `주문_nico_${index}`,
   *     stateCode: Skript.random(1, 5),
   *     goodsList: [
   *       {
   *         goodsId: index + 10000,
   *         name: `상품_nico_${index}`,
   *         price: index + 30000,
   *         sellerId: index % 7,
   *       },
   *       {
   *         goodsId: index + 10000,
   *         name: `상품2_nico_${index}`,
   *         price: index + 20000,
   *         sellerId: index % 4,
   *       },
   *     ],
   *   })
   * }
   *
   * // 첫번째 상품의 sellerId 로 묶기
   * console.log(Skript.groupBy(arrayObj, 'goodsList.0.sellerId'))
   *
   * // 첫번째 상품의 goodsId 맨끝 두자리로 묶기
   * console.log(Skript.groupBy(arrayObj, 'goodsList.0.goodsId', function (goodsId) {
   *    return Skript.str.right(goodsId, 2)
   * }))
   *
   *
   * // JSON placeholder todos API 호출 후 완료여부값으로 묶기
   * fetch('https://jsonplaceholder.typicode.com/users/1/todos')
   *    .then(res => res.json())
   *    .then(todos => {
   *        console.log(Skript.groupBy(todos, 'completed'));
   *    })
   * ```
   */
  groupBy(
    arr: any[],
    keyName: string,
    keyModifier?: (keyValue: string) => string,
  ): { [keyValue: string]: any } {
    const groupped: { [groupKey: string]: any } = {}
    Array.prototype.forEach.call(arr, (item: any) => {
      let confirmedKey = item[keyName]

      // 중첩키 처리(ex: arr.1.id)
      if (('' + keyName).indexOf('.') > -1) {
        confirmedKey = item
        keyName.split('.').forEach((splitedKey) => {
          if (confirmedKey[splitedKey]) {
            confirmedKey = confirmedKey[splitedKey]
          } else {
            confirmedKey = ''
          }
        })
      }

      // 키값 재구성 함수가 지정되었다면 적용
      if (typeof keyModifier === 'function') {
        confirmedKey = keyModifier(confirmedKey)
      }

      if (groupped[confirmedKey]) {
        groupped[confirmedKey].push(item)
      } else {
        groupped[confirmedKey] = [item]
      }
    })

    return groupped
  }

  /**
   * setInterval 랩핑함수
   * @param {number} interval - 실행시킬 간격(second)
   * @returns {*} 메소드 체이닝을 위한 tick 인스턴스
   * @example
   * ```javascript
   * Skript.tick(0.1) // 0.1초마다 실행
   *    .do(function (count) {
   *        console.log(count); // count 값을 콘솔 출력
   *    })
   *    .until(function () {
   *        return this.count < 10;  // count 값이 10보다 낮은 동안 반복
   *    })
   *    .whenEnd(function () {
   *        console.log('tick이 종료되었을 때 실행된다');
   *    });
   * ```
   */
  tick(interval: number): Tick {
    // tick 인스턴스 반환
    return {
      intervalId: -1,
      count: 1,

      // 테스터가 할당되지 않으면 무한반복되도록 true 반환
      tester: () => true,

      // 종료 메소드가 할당되지 않으면 기본 처리
      endHandler: () => { },

      // 지정된 액션을 실행
      do: function (action: (count?: number) => void) {
        this.intervalId = window.setInterval(() => {
          if (this.tester() === false) {
            clearInterval(this.intervalId)
            this.endHandler()
          } else {
            action(this.count++)
          }
        }, interval * 1000)
        return this
      },
      until: function (tester: () => boolean) {
        if (typeof tester === 'function') {
          this.tester = tester
        }
        return this
      },
      whenEnd: function (endHandler: () => void) {
        if (typeof endHandler === 'function') {
          this.endHandler = endHandler
        }
        return this
      },
    }
  }

  /**
   * runWhenReady 대상이 준비되면(null,undefined가 아니게 되면) 정해진 동작을 실행하는 메소드
   * @param {string |  (() => boolean) | (string | (() => boolean))[]} checkTarget - 준비여부를 확인할 대상 또는 메소드
   * @param {Function} task - 실행할 동작
   * @param {number=} tryCount - 재시도 횟수(0이면 계속 재시도)
   * @param {number=} intervalSecond - 재시도 간격(초)
   * @example
   * ```javascript
   * // kakaoPixel, kakaoT, kakaoT.key 가 준비되면 task를 실행(0.5초 간격으로 10번 재시도)
   * Skript.runWhenReady(
   *  ['kakaoPixel', 'kakaoT', 'kakaoT.key', function () { return true; }],
   *  function () {
   *    kakaoPixel('132323').send(kakaoT.key);
   *  },
   *  10,
   *  0.5
   * );
   * ```
   */
  runWhenReady(
    checkTarget: string | (() => boolean) | (string | (() => boolean))[],
    task: Function,
    tryCount: number = 0,
    intervalSecond: number = 1,
  ) {
    const checkTargetConfirmed =
      typeof checkTarget === 'string' || typeof checkTarget === 'function'
        ? [checkTarget]
        : checkTarget

    let count = 0

    const intervalId = setInterval(function () {
      // 재시도횟수를 초과했으면 종료
      if (tryCount > 0 && count > tryCount) {
        clearInterval(intervalId)
      }

      for (let index = 0; index < checkTargetConfirmed.length; index++) {
        if (typeof checkTargetConfirmed[index] === 'function') {
          try {
            if ((checkTargetConfirmed[index] as Function)() !== true) {
              count++
              return
            }
          } catch (error) {
            console.error(error)
            clearInterval(intervalId)
          }
        } else if (typeof checkTargetConfirmed[index] === 'string') {
          const targetString = checkTargetConfirmed[index] as string
          const splited = targetString.split('.')
          // kakaoT.key => ['kakaoT', 'key']

          let targetObj: any = (window as any)[splited[0]]

          for (let j = 1; j < splited.length; j++) {
            targetObj = targetObj[splited[j]]
            if (targetObj === null || targetObj === undefined) {
              count++
              return
            }
          }

          if (targetObj === null || targetObj === undefined) {
            count++
            return
          }
        } else {
          clearInterval(intervalId)
          throw new Error(
            `Unexpected Type [${typeof checkTargetConfirmed[
            index
            ]}] : 문자열 또는 boolean을 반환하는 함수여야합니다.`,
          )
        }
      }

      // checkTargetConfirmed 모두 null 또는 undefined가 아니면 task를 실행
      try {
        task()
      } catch (error) {
        console.error(error)
      } finally {
        clearInterval(intervalId)
      }
    }, intervalSecond * 1000)
  }

  /**
   * UUID 를 생성
   * @returns {string}
   */
  uuidv4(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (
      c,
    ) {
      var r = (Math.random() * 16) | 0,
        v = c == 'x' ? r : (r & 0x3) | 0x8
      return v.toString(16)
    })
  }

  /**
   * dom 관련 헬퍼함수
   */
  dom: any = {
    /**
     * @var Skript
     */
    app: this,

    /**
     *
     * @param {string} cssSelector 대상을 추적할 CSS Selector 문자열
     * @param {(el: Element) => boolean} filter 추가 필터링 함수
     * @returns {Array<any>} 대상의 value 배열
     * @example
     * ```html
     * <input type="checkbox" name="targets" class="__on" value="1" checked />
     * <input type="checkbox" name="targets" value="2" />
     * <input type="checkbox" name="targets" value="3" checked />
     * ```
     * ```javascript
     * // return [1, 3]
     * Skript.dom.pluckValue('[name="targets"]:checked');
     *
     * // return [1]
     * Skript.dom.pluckValue('[name="targets"]:checked', function (__el) {
     *    return __el.className.indexOf('__on') > -1;
     * }});
     * ```
     */
    pluckValue(
      cssSelector: string,
      filter?: (el: Element) => boolean,
    ): Array<any> {
      const result: Array<any> = []
      const targets = document.querySelectorAll(cssSelector)

      targets.forEach((el, index, parent) => {
        if (typeof filter == 'function' && filter(el) !== true) {
          return
        }

        if (
          el instanceof HTMLInputElement ||
          el instanceof HTMLTextAreaElement ||
          el instanceof HTMLSelectElement
        ) {
          result.push(el.value)
        } else {
          result.push(el.nodeValue)
        }
      })

      return result
    },

    /**
     *
     * @param {string} cssSelector 대상을 추적할 CSS Selector 문자열
     * @param {string} attributeName 추출할 아트리뷰트 이름
     * @param {(el: Element) => boolean} filter 추가 필터링 함수
     * @returns {Array<any>} 대상의 value 배열
     * @example
     * ```html
     * <input type="checkbox" name="targets" data-name="nico" class="__on" value="1" checked />
     * <input type="checkbox" name="targets" data-name="lulu" value="2" />
     * <input type="checkbox" name="targets" data-name="pike" value="3" checked />
     * ```
     * ```javascript
     * // return ['nico', 'pike']
     * Skript.dom.pluckValue('[name="targets"]:checked', 'data-name');
     *
     * // return ['nico']
     * Skript.dom.pluckValue('[name="targets"]:checked', 'data-name', function (__el) {
     *    return __el.className.indexOf('__on') > -1;
     * }});
     * ```
     */
    pluckAttribute(
      cssSelector: string,
      attributeName: string,
      filter?: (el: Element) => boolean,
    ): Array<any> {
      const result: Array<any> = []
      const targets = document.querySelectorAll(cssSelector)

      targets.forEach((el, index, parent) => {
        if (typeof filter == 'function' && filter(el) !== true) {
          return
        }

        result.push(el.getAttribute(attributeName))
      })

      return result
    },

    /**
     * 셀렉터에 해당하는 요소 갯수를 구하는 메소드
     * @param {string | any[]} selector css 셀렉터 문자열 또는 배열
     * @param {(item: any, i?: number) => boolean} filter 셀렉팅 된 요소를 순회하며 수행할 추가조건 필터함수
     * @returns 해당하는 갯수(필터가 지정된 경우 필터까지 적용되어 해당되는 갯수)
     * @throws Error - 유효하지 않은 셀렉터인 경우 예외를 발생시킴
     * @example
     * ```javascript
     * // input type text 엘리먼트 중에서 숫자값이고 3의 배수인 갯수를 조회하기
     * Skript.count(
     *    'input[type="text"]',
     *    (item) => {
     *        return !isNaN(item.value) && Number.parseInt(item.value) % 3 === 0;
     *    }
     * )
     *
     * // 문자열 배열에서 'nico'가 포함된 항목의 갯수를 구하기
     * Skript.count(
     *    ['niconico', 'noconoco', 'nice', 'freedom'],
     *    (str) => {
     *      return Skript.str.contains(str, 'nico');
     *    }
     * );
     * ```
     */
    count(
      selector: string | any[],
      filter?: (item: any, i?: number) => boolean,
    ): number {
      if (typeof selector !== 'string' && !selector.length) {
        throw new Error(
          `'${selector}(${typeof selector})' - 유효한 셀렉터가 아닙니다.`,
        )
      }

      // 대상 쿼리
      const targets =
        typeof selector === 'string'
          ? document.querySelectorAll(selector)
          : selector
      let count = targets.length

      // 추가 필터 함수가 전달되었다면 실행
      if (typeof filter == 'function') {
        count = 0
        // 타겟을 순회하며 필터에 해당하는 갯수를 센다
        for (let index = 0; index < targets.length; index++) {
          const target = targets[index]
          if (filter!(target, index) === true) {
            count++
          }
        }
      }

      // 최종 갯수 반환
      return count
    },

    /**
     * 셀렉터에 해당하는 value 획득
     * @param {string} selector CSS 셀렉터
     * @param {any=} defaultValue 엘리멘트가 없거나 값이 없을 때 반환할 기본값
     * @returns {*}
     * @example
     * ```javascript
     * // 'novalue'
     * Skript.dom.getValue('[name="target"]', 'novalue');
     * ```
     */
    getValue(selector: string, defaultValue: any = null): any {
      const targetEl: HTMLInputElement | null = document.querySelector(selector)
      if (targetEl) {
        return targetEl.value ? targetEl.value : defaultValue
      } else {
        return defaultValue
      }
    },
  }

  /**
   * 숫자 관련 헬퍼함수
   */
  number: any = {
    /**
     * 주어진 숫자값을 3자리 단위로 콤마처리
     * @param {number} value 숫자값
     * @returns {string}
     * @example
     * ```javascript
     * // '140,000,010'
     * Skript.number.comma(140000010);
     * ```
     */
    comma(value: number): string {
      const numberedValue = Number.parseFloat('' + value)
      if (isNaN(numberedValue)) {
        return ''
      } else if (Number.isFinite(numberedValue)) {
        return numberedValue.toLocaleString()
      } else {
        return numberedValue
          .toString()
          .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') // toLocaleString이 속도가 빠름
      }
    },
  }

  /**
   * 문자열 관련 헬퍼함수
   */
  str: any = {
    /**
     * 주어진 문자열에 해당 값이 존재하는지 체크
     * @param {string} value 검사 대상 문자열
     * @param {string} check 검사할 문자열
     * @returns {boolean}
     * @example
     * ```javascript
     * // return true
     * Skript.str.contains('future style nico', 'nico');
     *
     * // return false
     * Skript.str.contains('future style nico', 'past');
     * ```
     */
    contains(value: string, check: string): boolean {
      // 문자열로 확정보정
      value = '' + value
      check = '' + check

      return value.indexOf(check) > -1
    },

    /**
     * 주어진 문자열에 해당 배열의 값이 모두 존재하는지 체크
     * @param {string} value 검사 대상 문자열
     * @param {string[]} checks 검사할 배열
     * @returns {boolean}
     * @example
     * ```javascript
     * // return true
     * Skript.str.containsAll('future style nico', ['nico', 'style']);
     *
     * // return false
     * Skript.str.containsAll('future style nico', ['nico', 'past']);
     * ```
     */
    containsAll(value: string, checks: string[]): boolean {
      // 문자열로 확정보정
      value = '' + value

      for (let index = 0; index < checks.length; index++) {
        const check = '' + checks[index]
        if (check !== '' && value.indexOf(check) == -1) {
          return false
        }
      }
      return true
    },

    /**
     * 주어진 문자열에 해당 배열의 값중에 하나라도 존재하는지 체크
     * @param {string} value 검사 대상 문자열
     * @param {string[]} checks 검사할 배열
     * @returns {boolean}
     * @example
     * ```javascript
     * // return true
     * Skript.str.containsAny('future style nico', ['nico', 'past']);
     *
     * // return false
     * Skript.str.containsAny('future style nico', ['sick', 'past']);
     * ```
     */
    containsAny(value: string, checks: string[]): boolean {
      // 문자열로 확정보정
      value = '' + value

      for (let index = 0; index < checks.length; index++) {
        const check = '' + checks[index]
        if (check !== '' && value.indexOf(check) > -1) {
          return true
        }
      }
      return false
    },

    /**
     * 주어진 문자열에 해당 값으로 끝나는지 체크
     * @param {string} value 검사 대상 문자열
     * @param {string|string[]} check 검사할 문자열 또는 배열(or 체크)
     * @returns {boolean}
     * @example
     * ```javascript
     * // return true
     * Skript.str.endsWith('future style nico', ['nico', 'nami']);
     *
     * // return false
     * Skript.str.endsWith('future style nico', 'style');
     * ```
     */
    endsWith(value: string, check: string | string[]): boolean {
      // 문자열로 확정보정
      value = '' + value

      const listing = typeof check === 'string' ? [check] : check || []

      for (let index = 0; index < listing.length; index++) {
        const check = '' + (listing[index] || '')
        if (
          check !== '' &&
          value.lastIndexOf(check) === value.length - check.length
        ) {
          return true
        }
      }

      return false
    },

    /**
     * 주어진 문자열에 해당 값으로 끝난다면 주어진 문자열을, 해당 값으로 끝나지 않는다면 해당 값을 붙여 반환
     * @param {string} value 검사 대상 문자열
     * @param {string} ends 검사할 문자열
     * @returns {string}
     * @example
     * ```javascript
     * // return 'nico.jpg'
     * Skript.str.finish('nico', '.jpg');
     *
     * // return 'nico.jpg'
     * Skript.str.finish('nico.jpg', '.jpg');
     * ```
     */
    finish(value: string, ends: string): string {
      // 문자열로 확정보정
      value = '' + value
      ends = '' + ends

      return this.endsWith(value, ends) ? value : value + ends
    },

    /**
     * 주어진 문자열에 해당 값으로 시작하는지 체크
     * @param {string} value 검사 대상 문자열
     * @param {string|string[]} check 검사할 문자열 또는 배열(or 체크)
     * @returns {boolean}
     * @example
     * ```javascript
     * // return true
     * Skript.str.startsWith('future style nico', 'future');
     *
     * // return false
     * Skript.str.startsWith('future style nico', ['style', 'nico']);
     * ```
     */
    startsWith(value: string, check: string | string[]): boolean {
      // 문자열로 확정보정
      value = '' + value

      const listing = typeof check === 'string' ? [check] : check || []

      for (let index = 0; index < listing.length; index++) {
        const check = '' + (listing[index] || '')
        if (check !== '' && value.indexOf(check) === 0) {
          return true
        }
      }

      return false
    },

    /**
     * 주어진 문자열에 해당 값으로 시작한다면 주어진 문자열을, 해당 값으로 시작하지 않는다면 해당 값을 붙여 반환
     * @param {string} value 검사 대상 문자열
     * @param {string} starts 검사할 문자열
     * @returns {string}
     * @example
     * ```javascript
     * // return '/goods/133'
     * Skript.str.start('goods/133', '/');
     *
     * // return '/goods/133'
     * Skript.str.start('/goods/133', '/');
     * ```
     */
    start(value: string, starts: string): string {
      // 문자열로 확정보정
      value = '' + value
      starts = '' + starts

      return this.startsWith(value, starts) ? value : starts + value
    },

    /**
     * 문자열 길이를 제한(초과시 축약 문자열을 붙여 반환)
     * @param {string} value 대상 문자열
     * @param {number} limitLength 제한할 문자열 길이
     * @param {string=} limitMark 축약 문자열(기본: '...')
     * @returns {string}
     * @example
     * ```javascript
     * // return 'nico...'
     * Skript.str.limit('nico future style', 4);
     * ```
     */
    limit(
      value: string,
      limitLength: number,
      limitMark: string = '...',
    ): string {
      // 문자열로 확정보정
      value = '' + value

      if (value.length > limitLength) {
        return value.substring(0, limitLength) + limitMark
      } else {
        return value
      }
    },

    /**
     * 문자열 길이를 뒤에서부터 제한(초과시 축약 문자열을 붙여 반환)
     * @param {string} value 대상 문자열
     * @param {number} limitLength 제한할 문자열 길이
     * @param {string=} limitMark 축약 문자열(기본: '...')
     * @returns {string}
     * @example
     * ```javascript
     * // return '~yle'
     * Skript.str.reverseLimit('nico future style', 3, '~');
     * ```
     */
    reverseLimit(
      value: string,
      limitLength: number,
      limitMark: string = '...',
    ): string {
      // 문자열로 확정보정
      value = '' + value

      if (value.length > limitLength) {
        return limitMark + value.substring(value.length - limitLength)
      } else {
        return value
      }
    },

    /**
     * 문자열 내부의 특정 문자열을 주어진 값으로 감싸 반환
     * @param {string} value 전체 문자열
     * @param {string} target 감싸줄 특정 문자열
     * @param {string=} before 앞부분
     * @param {string=} after 뒷부분
     * @returns {string}
     * @example
     * ```javascript
     * // return 'future style <b>nico</b> attack <b>nico</b> double <b>nico</b> star'
     * Skript.str.wrap('future style nico attack nico double nico star', 'nico', '<b>', '</b>');
     * ```
     */
    wrap(
      value: string,
      target: string,
      before: string = '',
      after: string = '',
    ): string {
      // 문자열로 확정보정
      value = '' + value

      return value.split(target).join(before + target + after)
    },

    /**
     * left pad 처리
     * @param {string} value 대상 문자열
     * @param {number} length 보정할 최소길이
     * @param {stirng} padString 패딩 문자
     * @returns {string}
     * @example
     * ```javascript
     * // returns '0000000001'
     * Skript.str.padLeft('1', 10, '0')
     *
     * // 패딩 문자가 단일 문자가 아닌 경우, 임의절삭하지 않고 최소 길이와 같거나 이상이 될때까지 패딩처리함
     * // returns 'abcdabcdOK'
     * Skript.str.padLeft('OK', 8, 'abcd')
     * // length 값은 8이지만, 'abcd'를 1회 패딩할 경우 'abcdOK' 가 되어 8자리가 되지 않으므로 한 번 더 패딩해 'abcdabcdOK'를 반환 (10자리)
     * ```
     */
    padLeft(value: string, length: number, padString: string): string {
      return this.pad(value, length, padString, 'left')
    },

    /**
     * right pad 처리
     * @param {string} value 대상 문자열
     * @param {number} length 보정할 최소길이
     * @param {stirng} padString 패딩 문자
     * @returns {string}
     * @example
     * ```javascript
     * // returns '1000000000'
     * Skript.str.padRight('1', 10, '0')
     *
     * // 패딩 문자가 단일 문자가 아닌 경우, 임의절삭하지 않고 최소 길이와 같거나 이상이 될때까지 패딩처리함
     * // returns 'OKabcdabcd'
     * Skript.str.padRight('OK', 8, 'abcd')
     * // length 값은 8이지만, 'abcd'를 1회 패딩할 경우 'OKabcd' 가 되어 8자리가 되지 않으므로 한 번 더 패딩해 'OKabcdabcd'를 반환 (10자리)
     * ```
     */
    padRight(value: string, length: number, padString: string): string {
      return this.pad(value, length, padString, 'right')
    },

    /**
     * 문자열 pad 처리
     * @param {string} value 대상 문자열
     * @param {number} length 보정할 최소길이
     * @param {stirng} padString 패딩 문자
     * @param {string} direction pad 방향
     * @returns {string}
     * @ignore 내부사용
     */
    pad(
      value: string,
      length: number,
      padString: string,
      direction: string,
    ): string {
      // 보충문자 체크
      padString = padString || ''
      if (isNaN(length) || length < 1) {
        throw new Error('패딩 길이가 유효하지 않습니다.')
      } else if (padString === '') {
        throw new Error('패딩 문자가 지정되지 않았습니다.')
      } else if (direction !== 'left' && direction !== 'right') {
        throw new Error('패딩 방향이 유효하지 않습니다.')
      }

      // 문자열로 확정보정
      value = '' + value

      // 최소길이에 도달할 때까지 재귀호출
      if (value.length < length) {
        return this.pad(
          direction === 'right' ? value + padString : padString + value,
          length,
          padString,
          direction,
        )
      } else {
        return value
      }
    },

    /**
     * 문자열의 왼쪽부터 지정된 길이를 반환
     * @param {string} text 대상 문자열
     * @param {number} length 자를 길이
     * @returns {string}
     * @example
     * ```javascript
     * // 'Ni'
     * Skript.str.left('Nico', 2)
     * ```
     */
    left(text: string, length: number): string {
      return ('' + text).substring(0, length)
    },

    /**
     * 문자열의 오른쪽부터 지정된 길이를 반환
     * @param {string} text 대상 문자열
     * @param {number} length 자를 길이
     * @returns {string}
     * @example
     * ```javascript
     * // 'co'
     * Skript.str.right('Nico', 2)
     * ```
     */
    right(text: string, length: number): string {
      text = '' + text
      return text.substring(text.length - length, length)
    },
  }

  /**
   * 카운트다운 헬퍼
   * @param {(Date | string)} targetDatetime 카운트다운 목표 시간
   * @param {string} intervalType 카운트다운 간격(ms/millisecond/s/second/m/minute)
   * @param {Function(number, any): void} countdownHandler 카운트다운 처리자
   * @param {boolean} excuteOnInitialized 초기화시점에 handler를 1회 실행시킬지 여부
   * @returns {Promise<void>}
   * @throws Error targetDatetime이 Date 타입으로 변경 불가능한 경우 예외를 발생시킴
   * @example
   * ```javascript
   * Skript.countdown('2020-12-25', 's', function (diffInMillisecond, diffs) {
   *  console.log('크리스마스까지 남은 시간 : ' + diffs.hour + '시간 ' + diffs.minute + '분 ' + diffs.second + '초');
   * })
   * .then(function () {
   *  // 카운트다운 종료시점에 실행됨
   *  console.log('크리스마스가 되었습니다!');
   * });
   * ```
   */
  countdown(
    targetDatetime: Date | string,
    intervalType: string,
    countdownHandler: (diffInmillisecond: number, diffs: any) => void,
    excuteOnInitialized: boolean = false,
  ): Promise<void> {
    // Date 타입으로 확정보정
    let targetDate: Date
    if (typeof targetDatetime === 'string') {
      targetDate = new Date(targetDatetime)

      if (isNaN(targetDate.getTime())) {
        throw new Error(`Date 타입으로 변환할 수 없습니다. (${targetDatetime})`)
      }
    } else {
      targetDate = targetDatetime
    }

    const targetDateTime = targetDate.getTime()

    // 카운트다운 할 초 간격(기본 1)
    let intervalSecond: number = 1

    switch (intervalType.toLowerCase()) {
      case 's':
      case 'second':
      case 'seconds':
        break
      case 'ms':
      case 'millisecond':
      case 'milliseconds':
        intervalSecond = 0.001
        break
      case 'm':
      case 'minute':
      case 'minutes':
        intervalSecond = 60
        break
      case 'h':
      case 'hour':
      case 'hours':
        intervalSecond = 3600
        break
      default:
        break
    }

    if (excuteOnInitialized === true) {
      const diffInMs = targetDateTime - Date.now()
      countdownHandler(diffInMs, {
        hour: Math.floor(diffInMs / 1000 / 60 / 60),
        minute: Math.floor(diffInMs / 1000 / 60) % 60,
        second: Math.floor(diffInMs / 1000) % 60,
      })
    }

    // 내부적으로 tick 구동되는 프로미스를 반환
    return new Promise((resolve, reject) => {
      try {
        this.tick(intervalSecond)
          .do(() => {
            const diffInMillisecond = targetDateTime - Date.now()
            countdownHandler(diffInMillisecond, {
              hour: Math.floor(diffInMillisecond / 1000 / 60 / 60),
              minute: Math.floor(diffInMillisecond / 1000 / 60) % 60,
              second: Math.floor(diffInMillisecond / 1000) % 60,
            })
          })
          .until(() => {
            return targetDateTime > Date.now()
          })
          .whenEnd(() => {
            resolve()
          })
      } catch (error) {
        reject(error)
      }
    })
  }

  /**
   * MD5 암호화 함수
   * @example
   * ```javascript
   * // return '410ec15153a6dff0bed851467309bcbd'
   * Skript.md5('nico');
   * ```
   */
  md5 = md5
}

export = Skript