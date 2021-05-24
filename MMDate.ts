import moment from 'moment'

/**
 * 날짜 시간 관리용 랩핑 클래스
 */
class MMDate {
  /**
   * 내부관리용 라이브러리 인스턴스
   * @ignore
   */
  private _momentInstance: moment.Moment

  constructor(input?: any) {
    this._momentInstance = moment(input)
  }

  /**
   * ymd 축약 게터
   * @returns {string}
   * @example
   * ```javascript
   * var mmDate = new MMDate('2020-04-01 15:14:44')
   * // "20200401"
   * mmDate.ymd
   * ```
   */
  get ymd(): string {
    return this.format('yyyyMMDD')
  }

  /**
   * native Date 인스턴스를 획득
   * @example
   * ```javascript
   * var mmDate1 = new MMDate('2020-01-01')
   * mmDate1.getDateInstance()
   * ```
   */
  getDateInstance(): Date {
    return this._momentInstance.toDate()
  }

  /**
   * 날짜 포맷팅 메소드
   * @param {string} format 포맷 템플릿 문자열
   * @returns {string}
   * @see https://momentjs.com/docs/#/displaying/
   * @example
   * ```javascript
   * var formattedString = mmDate.format('YYYY년 MM월 DD일')
   * ```
   */
  format(format?: string): string {
    return this._momentInstance.format(format)
  }

  /**
   * 두 시간점 사이의 간격을 구하는 메소드
   * @param {*} targetInput 비교 대상이 될 날짜분석에 사용할 값
   * @param {*} unit 비교단위 (seconds, minutes, hours, days, weeks, months, years)
   * @param {boolean} isTruncate 소수점 단위 절사여부
   * @returns {number} unit 에 해당하는 차이값
   * @example
   * ```javascript
   * var mmDate1 = new MMDate('2020-01-01')
   * var mmDate2 = new MMDate('2020-01-31')
   * // -30
   * console.log(mmDate1.diffIn(mmDate2, 'days'))
   * ```
   */
  diffIn(
    targetInput: any,
    unit: any = 'days',
    isTruncate: boolean = true,
  ): number {
    // 유닛값 문자열로 확정보정
    unit = '' + unit

    // 실제 적용할 유닛값
    let confirmedUnit = unit

    // 유닛값에 따라 실적용 유닛값 보정
    switch (unit.toLowerCase()) {
      case 'milliseconds':
      case 'ms':
        confirmedUnit = 'milliseconds'
        break
      case 'seconds':
      case 'second':
      case 'sec':
      case 's':
        confirmedUnit = 'seconds'
        break

      case 'minutes':
      case 'minute':
      case 'min':
        confirmedUnit = 'minutes'
        break

      case 'hours':
      case 'hour':
      case 'h':
        confirmedUnit = 'hours'
        break

      case 'days':
      case 'day':
      case 'd':
        confirmedUnit = 'days'
        break

      case 'weeks':
      case 'week':
      case 'w':
        confirmedUnit = 'weeks'
        break

      case 'months':
      case 'month':
      case 'm':
        confirmedUnit = 'months'
        break

      case 'years':
      case 'year':
      case 'y':
        confirmedUnit = 'years'
        break

      default:
        break
    }

    return this._momentInstance.diff(
      moment(targetInput._momentInstance || targetInput),
      confirmedUnit,
      !isTruncate,
    )
  }

  /**
   * 비교대상 시간점의 날짜와 같거나 이전인지를 체크하는 메소드
   * @param {*} targetInput 비교 대상이 될 날짜분석에 사용할 값
   * @param {*} unit 비교단위 (seconds, minutes, hours, days, weeks, months, years) - 기본값 : days
   * @returns {boolean}
   * @example
   * ```javascript
   * var mmDate1 = new MMDate('2020-01-01 10:00:10')
   * // false
   * mmDate1.isBeforeOrEqual('2020-01-01 10:00:09')
   * // true
   * mmDate1.isBeforeOrEqual('2020-01-01 10:00:09', 'seconds')
   * ```
   */
  isBeforeOrEqual(targetInput: any, unit: any = 'days'): boolean {
    return this._momentInstance.isSameOrBefore(
      targetInput._momentInstance || targetInput,
      unit || 'days',
    )
  }

  /**
   * 비교대상 시간점의 날짜보다 이전인지를 체크하는 메소드
   * @param {*} targetInput 비교 대상이 될 날짜분석에 사용할 값
   * @param {*} unit 비교단위 (seconds, minutes, hours, days, weeks, months, years) - 기본값 : days
   * @returns {boolean}
   * @example
   * ```javascript
   * var mmDate1 = new MMDate('2020-01-01')
   * // false
   * mmDate1.isBefore('2020-01-01')
   * ```
   */
  isBefore(targetInput: any, unit: any = 'days'): boolean {
    return this._momentInstance.isBefore(
      targetInput._momentInstance || targetInput,
      unit || 'days',
    )
  }

  /**
   * 비교대상 시간점의 날짜와 같거나 이후인지를 체크하는 메소드
   * @param {*} targetInput 비교 대상이 될 날짜분석에 사용할 값
   * @param {*} unit 비교단위 (seconds, minutes, hours, days, weeks, months, years) - 기본값 : days
   * @returns {boolean}
   * @example
   * ```javascript
   * var mmDate1 = new MMDate('2020-01-01')
   * // false
   * mmDate1.isAfterOrEqual('2019-12-31')
   * ```
   */
  isAfterOrEqual(targetInput: any, unit: any = 'days'): boolean {
    return this._momentInstance.isSameOrAfter(
      targetInput._momentInstance || targetInput,
      unit || 'days',
    )
  }

  /**
   * 비교대상 시간점의 날짜보다 이후인지를 체크하는 메소드
   * @param {*} targetInput 비교 대상이 될 날짜분석에 사용할 값
   * @param {*} unit 비교단위 (seconds, minutes, hours, days, weeks, months, years) - 기본값 : days
   * @returns {boolean}
   * @example
   * ```javascript
   * var mmDate1 = new MMDate('2020-01-01')
   * // true
   * mmDate1.isAfter('2019-12-31')
   *
   * var mmDate2 = new MMDate('2020-01-01')
   * // false
   * mmDate1.isAfter(mmDate2)
   * ```
   */
  isAfter(targetInput: any, unit: any = 'days'): boolean {
    return this._momentInstance.isAfter(
      targetInput._momentInstance || targetInput,
      unit || 'days',
    )
  }

  /**
   * 인스턴스에서 지정된 간격만큼 이전의 MMDate 인스턴스를 생성해서 반환
   * @param {number} term 간격값
   * @param {*} unit 간격단위 (seconds, minutes, hours, days, weeks, months, years)
   * @returns {MMDate}
   * @example
   * ```javascript
   * var mmDate = new MMDate('2020-01-01')
   * var mmDate2 = mmDate.before(1, 'months')
   * // "2019-12-01 00:00:00"
   * console.log(mmDate2.toString())
   * ```
   */
  before(term: number, unit: any): MMDate {
    return new MMDate(this._momentInstance.clone().subtract(term, unit))
  }

  /**
   * 인스턴스에서 지정된 간격만큼 이후의 MMDate 인스턴스를 생성해서 반환
   * @param {number} term 간격값
   * @param {*} unit 간격단위 (seconds, minutes, hours, days, weeks, months, years)
   * @returns {MMDate}
   * @example
   * ```javascript
   * var mmDate = new MMDate('2020-01-01')
   * var mmDate2 = mmDate.after(10, 'days')
   * // "2020-01-11 00:00:00"
   * console.log(mmDate2.toString())
   * ```
   */
  after(term: number, unit: any): MMDate {
    return new MMDate(this._momentInstance.clone().add(term, unit))
  }

  toString(): string {
    return this.format('YYYY-MM-DD HH:mm:ss')
  }
}

export { MMDate }
