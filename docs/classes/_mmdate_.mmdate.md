[@owneul/skript](../README.md) › [Globals](../globals.md) › ["MMDate"](../modules/_mmdate_.md) › [MMDate](_mmdate_.mmdate.md)

# Class: MMDate

날짜 시간 관리용 랩핑 클래스

## Hierarchy

* **MMDate**

## Index

### Constructors

* [constructor](_mmdate_.mmdate.md#constructor)

### Accessors

* [ymd](_mmdate_.mmdate.md#ymd)

### Methods

* [after](_mmdate_.mmdate.md#after)
* [before](_mmdate_.mmdate.md#before)
* [diffIn](_mmdate_.mmdate.md#diffin)
* [format](_mmdate_.mmdate.md#format)
* [getDateInstance](_mmdate_.mmdate.md#getdateinstance)
* [isAfter](_mmdate_.mmdate.md#isafter)
* [isAfterOrEqual](_mmdate_.mmdate.md#isafterorequal)
* [isBefore](_mmdate_.mmdate.md#isbefore)
* [isBeforeOrEqual](_mmdate_.mmdate.md#isbeforeorequal)
* [toString](_mmdate_.mmdate.md#tostring)

## Constructors

###  constructor

\+ **new MMDate**(`input?`: any): *[MMDate](_mmdate_.mmdate.md)*

*Defined in [MMDate.ts:11](https://github.com/kei155/Skript.js/blob/3b19926/MMDate.ts#L11)*

**Parameters:**

Name | Type |
------ | ------ |
`input?` | any |

**Returns:** *[MMDate](_mmdate_.mmdate.md)*

## Accessors

###  ymd

• **get ymd**(): *string*

*Defined in [MMDate.ts:27](https://github.com/kei155/Skript.js/blob/3b19926/MMDate.ts#L27)*

ymd 축약 게터

**`example`** 
```javascript
var mmDate = new MMDate('2020-04-01 15:14:44')
// "20200401"
mmDate.ymd
```

**Returns:** *string*

## Methods

###  after

▸ **after**(`term`: number, `unit`: any): *[MMDate](_mmdate_.mmdate.md)*

*Defined in [MMDate.ts:254](https://github.com/kei155/Skript.js/blob/3b19926/MMDate.ts#L254)*

인스턴스에서 지정된 간격만큼 이후의 MMDate 인스턴스를 생성해서 반환

**`example`** 
```javascript
var mmDate = new MMDate('2020-01-01')
var mmDate2 = mmDate.after(10, 'days')
// "2020-01-11 00:00:00"
console.log(mmDate2.toString())
```

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`term` | number | 간격값 |
`unit` | any | 간격단위 (seconds, minutes, hours, days, weeks, months, years) |

**Returns:** *[MMDate](_mmdate_.mmdate.md)*

___

###  before

▸ **before**(`term`: number, `unit`: any): *[MMDate](_mmdate_.mmdate.md)*

*Defined in [MMDate.ts:237](https://github.com/kei155/Skript.js/blob/3b19926/MMDate.ts#L237)*

인스턴스에서 지정된 간격만큼 이전의 MMDate 인스턴스를 생성해서 반환

**`example`** 
```javascript
var mmDate = new MMDate('2020-01-01')
var mmDate2 = mmDate.before(1, 'months')
// "2019-12-01 00:00:00"
console.log(mmDate2.toString())
```

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`term` | number | 간격값 |
`unit` | any | 간격단위 (seconds, minutes, hours, days, weeks, months, years) |

**Returns:** *[MMDate](_mmdate_.mmdate.md)*

___

###  diffIn

▸ **diffIn**(`targetInput`: any, `unit`: any, `isTruncate`: boolean): *number*

*Defined in [MMDate.ts:71](https://github.com/kei155/Skript.js/blob/3b19926/MMDate.ts#L71)*

두 시간점 사이의 간격을 구하는 메소드

**`example`** 
```javascript
var mmDate1 = new MMDate('2020-01-01')
var mmDate2 = new MMDate('2020-01-31')
// -30
console.log(mmDate1.diffIn(mmDate2, 'days'))
```

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`targetInput` | any | - | 비교 대상이 될 날짜분석에 사용할 값 |
`unit` | any | "days" | 비교단위 (seconds, minutes, hours, days, weeks, months, years) |
`isTruncate` | boolean | true | 소수점 단위 절사여부 |

**Returns:** *number*

unit 에 해당하는 차이값

___

###  format

▸ **format**(`format?`: undefined | string): *string*

*Defined in [MMDate.ts:53](https://github.com/kei155/Skript.js/blob/3b19926/MMDate.ts#L53)*

날짜 포맷팅 메소드

**`see`** https://momentjs.com/docs/#/displaying/

**`example`** 
```javascript
var formattedString = mmDate.format('YYYY년 MM월 DD일')
```

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`format?` | undefined &#124; string | 포맷 템플릿 문자열 |

**Returns:** *string*

___

###  getDateInstance

▸ **getDateInstance**(): *Date*

*Defined in [MMDate.ts:39](https://github.com/kei155/Skript.js/blob/3b19926/MMDate.ts#L39)*

native Date 인스턴스를 획득

**`example`** 
```javascript
var mmDate1 = new MMDate('2020-01-01')
mmDate1.getDateInstance()
```

**Returns:** *Date*

___

###  isAfter

▸ **isAfter**(`targetInput`: any, `unit`: any): *boolean*

*Defined in [MMDate.ts:217](https://github.com/kei155/Skript.js/blob/3b19926/MMDate.ts#L217)*

비교대상 시간점의 날짜보다 이후인지를 체크하는 메소드

**`example`** 
```javascript
var mmDate1 = new MMDate('2020-01-01')
// true
mmDate1.isAfter('2019-12-31')

var mmDate2 = new MMDate('2020-01-01')
// false
mmDate1.isAfter(mmDate2)
```

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`targetInput` | any | - | 비교 대상이 될 날짜분석에 사용할 값 |
`unit` | any | "days" | 비교단위 (seconds, minutes, hours, days, weeks, months, years) - 기본값 : days |

**Returns:** *boolean*

___

###  isAfterOrEqual

▸ **isAfterOrEqual**(`targetInput`: any, `unit`: any): *boolean*

*Defined in [MMDate.ts:194](https://github.com/kei155/Skript.js/blob/3b19926/MMDate.ts#L194)*

비교대상 시간점의 날짜와 같거나 이후인지를 체크하는 메소드

**`example`** 
```javascript
var mmDate1 = new MMDate('2020-01-01')
// false
mmDate1.isAfterOrEqual('2019-12-31')
```

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`targetInput` | any | - | 비교 대상이 될 날짜분석에 사용할 값 |
`unit` | any | "days" | 비교단위 (seconds, minutes, hours, days, weeks, months, years) - 기본값 : days |

**Returns:** *boolean*

___

###  isBefore

▸ **isBefore**(`targetInput`: any, `unit`: any): *boolean*

*Defined in [MMDate.ts:175](https://github.com/kei155/Skript.js/blob/3b19926/MMDate.ts#L175)*

비교대상 시간점의 날짜보다 이전인지를 체크하는 메소드

**`example`** 
```javascript
var mmDate1 = new MMDate('2020-01-01')
// false
mmDate1.isBefore('2020-01-01')
```

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`targetInput` | any | - | 비교 대상이 될 날짜분석에 사용할 값 |
`unit` | any | "days" | 비교단위 (seconds, minutes, hours, days, weeks, months, years) - 기본값 : days |

**Returns:** *boolean*

___

###  isBeforeOrEqual

▸ **isBeforeOrEqual**(`targetInput`: any, `unit`: any): *boolean*

*Defined in [MMDate.ts:156](https://github.com/kei155/Skript.js/blob/3b19926/MMDate.ts#L156)*

비교대상 시간점의 날짜와 같거나 이전인지를 체크하는 메소드

**`example`** 
```javascript
var mmDate1 = new MMDate('2020-01-01 10:00:10')
// false
mmDate1.isBeforeOrEqual('2020-01-01 10:00:09')
// true
mmDate1.isBeforeOrEqual('2020-01-01 10:00:09', 'seconds')
```

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`targetInput` | any | - | 비교 대상이 될 날짜분석에 사용할 값 |
`unit` | any | "days" | 비교단위 (seconds, minutes, hours, days, weeks, months, years) - 기본값 : days |

**Returns:** *boolean*

___

###  toString

▸ **toString**(): *string*

*Defined in [MMDate.ts:258](https://github.com/kei155/Skript.js/blob/3b19926/MMDate.ts#L258)*

**Returns:** *string*
