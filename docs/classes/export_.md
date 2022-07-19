[@owneul/skript](../README.md) / [Exports](../modules.md) / export%3D

# Class: export=

애플리케이션 스케일 클래스

**`classdesc`** 애플리케이션에서 사용하는 스크립트에 대한 관리를 총괄

**`requires`** module:axios

**`requires`** module:md5

**`requires`** module:MMDate

## Table of contents

### Constructors

- [constructor](export_.md#constructor)

### Properties

- [dom](export_.md#dom)
- [md5](export_.md#md5)
- [number](export_.md#number)
- [str](export_.md#str)

### Methods

- [addAction](export_.md#addaction)
- [clone](export_.md#clone)
- [countdown](export_.md#countdown)
- [extract](export_.md#extract)
- [extractFormData](export_.md#extractformdata)
- [extractJson](export_.md#extractjson)
- [getQueryParam](export_.md#getqueryparam)
- [getQueryParams](export_.md#getqueryparams)
- [groupBy](export_.md#groupby)
- [querify](export_.md#querify)
- [random](export_.md#random)
- [range](export_.md#range)
- [runAction](export_.md#runaction)
- [runWhenReady](export_.md#runwhenready)
- [syncQueryParamsToPage](export_.md#syncqueryparamstopage)
- [tick](export_.md#tick)
- [uuidv4](export_.md#uuidv4)
- [wait](export_.md#wait)

## Constructors

### constructor

\+ **new export=**(): [*export=*](export_.md)

**Returns:** [*export=*](export_.md)

## Properties

### dom

• **dom**: *any*

dom 관련 헬퍼함수

Defined in: [Skript.ts:1503](https://github.com/kei155/Skript.js/blob/1a5bcfd/Skript.ts#L1503)

___

### md5

• **md5**: (`message`: *string* \| Buffer \| *number*[] \| Uint8Array, `options`: md5.Options & { `asBytes`: ``true``  }) => *number*[](`message`: *string* \| Buffer \| *number*[] \| Uint8Array, `options?`: *Pick*<md5.Options, ``"asString"`` \| ``"encoding"``\>) => *string*(`message`: *string* \| Buffer \| *number*[] \| Uint8Array, `options?`: md5.Options) => *string* \| *number*[]

MD5 암호화 함수

**`example`**
```javascript
// return '410ec15153a6dff0bed851467309bcbd'
Skript.md5('nico');
```

#### Type declaration

▸ (`message`: *string* \| Buffer \| *number*[] \| Uint8Array, `options`: md5.Options & { `asBytes`: ``true``  }): *number*[]

js function for hashing messages with MD5

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `message` | *string* \| Buffer \| *number*[] \| Uint8Array | a string or buffer to hash |
| `options` | md5.Options & { `asBytes`: ``true``  } |  |

**Returns:** *number*[]

the resultant MD5 hash of the given message

▸ (`message`: *string* \| Buffer \| *number*[] \| Uint8Array, `options?`: *Pick*<md5.Options, ``"asString"`` \| ``"encoding"``\>): *string*

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | *string* \| Buffer \| *number*[] \| Uint8Array |
| `options?` | *Pick*<md5.Options, ``"asString"`` \| ``"encoding"``\> |

**Returns:** *string*

▸ (`message`: *string* \| Buffer \| *number*[] \| Uint8Array, `options?`: md5.Options): *string* \| *number*[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | *string* \| Buffer \| *number*[] \| Uint8Array |
| `options?` | md5.Options |

**Returns:** *string* \| *number*[]

Defined in: [Skript.ts:2192](https://github.com/kei155/Skript.js/blob/1a5bcfd/Skript.ts#L2192)

___

### number

• **number**: *any*

숫자 관련 헬퍼함수

Defined in: [Skript.ts:1679](https://github.com/kei155/Skript.js/blob/1a5bcfd/Skript.ts#L1679)

___

### str

• **str**: *any*

문자열 관련 헬퍼함수

Defined in: [Skript.ts:1707](https://github.com/kei155/Skript.js/blob/1a5bcfd/Skript.ts#L1707)

## Methods

### addAction

▸ **addAction**(`selector`: *string* \| HTMLElement \| NodeList \| Window \| Document, `args`: Function \| AddActionOption, `baseElementOrDocument?`: HTMLElement): *void*

화면 구성요소에 이벤트를 걸어주는 숏컷함수

**`example`**
```javascript
// class-name 이라는 클래스를 가진 엘리먼트에 keyup(enter) 이벤트를 거치
Skript.addAction('.class-name', {
   eventType: '$enter',
   callback: function (targets) {
       // 콜백 스코프의 this는 이벤트가 걸린 타겟을 가리킨다
       console.log(targets.length, this.innerText);
   },
});

// 축약형태(click 이벤트) 사용
Skript.addAction('document', function () {
   console.log('document clicked!');
});
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `selector` | *string* \| HTMLElement \| NodeList \| Window \| Document | 대상을 선택하는 기준 |
| `args` | Function \| AddActionOption | 추가옵션 |
| `baseElementOrDocument?` | HTMLElement | - |

**Returns:** *void*

Defined in: [Skript.ts:359](https://github.com/kei155/Skript.js/blob/1a5bcfd/Skript.ts#L359)

___

### clone

▸ **clone**(`value`: *any*): *any*

객체 deep clone 메소드

**`example`**
```javascript
var obj = {
   name: '니코',
   age: 19,
   subjects: ['수학', '과학', '미술'],
   address: {
     base: '기본주소',
     detail: '세부주소',
     postcode: '우편번호'
   },
   sayName: function () {
     alert(this.name);
   },
};

// 참조복사
var refObj = obj;
// true
console.log(refObj === obj);

// 클로닝
var cloneObj = Skript.clone(obj);
// false
console.log(cloneObj === obj);

```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | *any* | 복사할 대상 |

**Returns:** *any*

복사된 결과

Defined in: [Skript.ts:323](https://github.com/kei155/Skript.js/blob/1a5bcfd/Skript.ts#L323)

___

### countdown

▸ **countdown**(`targetDatetime`: *string* \| Date, `intervalType`: *string*, `countdownHandler`: (`diffInmillisecond`: *number*, `diffs`: *any*) => *void*, `excuteOnInitialized?`: *boolean*): *Promise*<void\>

카운트다운 헬퍼

**`throws`** Error targetDatetime이 Date 타입으로 변경 불가능한 경우 예외를 발생시킴

**`example`**
```javascript
Skript.countdown('2020-12-25', 's', function (diffInMillisecond, diffs) {
 console.log('크리스마스까지 남은 시간 : ' + diffs.hour + '시간 ' + diffs.minute + '분 ' + diffs.second + '초');
})
.then(function () {
 // 카운트다운 종료시점에 실행됨
 console.log('크리스마스가 되었습니다!');
});
```

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `targetDatetime` | *string* \| Date | - | 카운트다운 목표 시간 |
| `intervalType` | *string* | - | 카운트다운 간격(ms/millisecond/s/second/m/minute) |
| `countdownHandler` | (`diffInmillisecond`: *number*, `diffs`: *any*) => *void* | - | 카운트다운 처리자 |
| `excuteOnInitialized` | *boolean* | false | 초기화시점에 handler를 1회 실행시킬지 여부 |

**Returns:** *Promise*<void\>

Defined in: [Skript.ts:2104](https://github.com/kei155/Skript.js/blob/1a5bcfd/Skript.ts#L2104)

___

### extract

▸ **extract**(`selector`: *string*, `options?`: ExtractOption): *object* \| FormData

**`throws`** Error - 대상 엘리먼트가 존재하지 않거나 데이터 타입이 유효하지 않으면 예외를 발생시킴

**`example`**
```html
<form id="form">
   <input type="hidden" name="grade" value="3" />
   <input type="text" name="age" value="19" />
</form>
```
```javascript
// return { name: '니코', age: '19', grade: '3' }
Skript.extract('#form', {
   dataType: 'json',
   appends: {
       name: '니코',
       age: 12
   }
})
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `selector` | *string* | 대상 엘리먼트를 특정할 수 있는 CSS 셀렉터 |
| `options?` | ExtractOption | 추가옵션 |

**Returns:** *object* \| FormData

추출된 결과데이터

Defined in: [Skript.ts:885](https://github.com/kei155/Skript.js/blob/1a5bcfd/Skript.ts#L885)

___

### extractFormData

▸ **extractFormData**(`element`: Element, `appends?`: *any*, `fileHandler?`: (`fd`: FormData, `name`: *string*, `files`: ``null`` \| FileList, `element`: HTMLInputElement) => *void*): FormData

**`brief`** 엘리먼트에서 FormData 인스턴스 추출 (extract 함수의 타입 축약형)

**`example`**
```javascript
Skript.extractFormData(document.querySelector('#form'), {
   name: '니코',
   age: 19
})
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `element` | Element | 폼데이터 인스턴스를 추출할 엘리먼트 |
| `appends?` | *any* | 취합할 데이터(같은 이름 데이터가 element 하위에 있는 경우 appends 에 있는 값은 덮어씌워짐) |
| `fileHandler?` | (`fd`: FormData, `name`: *string*, `files`: ``null`` \| FileList, `element`: HTMLInputElement) => *void* | - |

**Returns:** FormData

FormData

Defined in: [Skript.ts:1020](https://github.com/kei155/Skript.js/blob/1a5bcfd/Skript.ts#L1020)

___

### extractJson

▸ **extractJson**(`element`: Element, `appends?`: *any*, `includeEmptyValue?`: *boolean*): *any*

엘리먼트에서 JavaScript Object 인스턴스 추출 (extract 함수의 타입 축약형)

**`example`**
```javascript
Skript.extractJson(document.querySelector('#form'), {
   name: '니코',
   age: 19
})
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `element` | Element | 폼데이터 인스턴스를 추출할 엘리먼트 |
| `appends?` | *any* | 취합할 데이터(같은 이름 데이터가 element 하위에 있는 경우 appends 에 있는 값은 덮어씌워짐) |
| `includeEmptyValue?` | *boolean* | 빈 값을 포함시킬지 여부 |

**Returns:** *any*

Object

Defined in: [Skript.ts:925](https://github.com/kei155/Skript.js/blob/1a5bcfd/Skript.ts#L925)

___

### getQueryParam

▸ **getQueryParam**(`paramKey`: *string*, `querystring?`: *string*): *string* \| *number* \| *object*

쿼리스트링의 특정 키값을 조회

**`example`**
```javascript
// return 'best'
Skript.getQueryParam('key', '?key=best');

// return [1, 2, 3.14]
Skript.getQueryParam('checks', '?checks[]=1&checks[]=2&checks[]=3.14');

// return { name: "니코", age: 19, grade: 3 }
Skript.getQueryParam('data', '?data[name]=니코&data[age]=19&data[grade]=3');
// return '니코'
Skript.getQueryParam('data[name]', '?data[name]=니코&data[age]=19&data[grade]=3');
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `paramKey` | *string* | 조회할 쿼리스트링 키 |
| `querystring?` | *string* | 분석대상이 될 쿼리스트링 (미지정시 location.search 를 사용합니다) |

**Returns:** *string* \| *number* \| *object*

해당 키에 해당하는 값

Defined in: [Skript.ts:116](https://github.com/kei155/Skript.js/blob/1a5bcfd/Skript.ts#L116)

___

### getQueryParams

▸ **getQueryParams**(`querystring?`: *string*): QueryParameters

쿼리스트링을 분해하여 반환

**`example`**
```javascript
// return { checks: [1, 2, 3.14] }
Skript.getQueryParams('?checks[]=1&checks[]=2&checks[]=3.14');

// return { data: { name: "니코", age: 19, grade: 3 }, link: 'http://google.com' }
Skript.getQueryParams('?data[name]=니코&data[age]=19&data[grade]=3&link=http://google.com');
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `querystring?` | *string* | 분석대상이 될 쿼리스트링 (미지정시 location.search 를 사용합니다) |

**Returns:** QueryParameters

쿼리 파라미터 구조체

Defined in: [Skript.ts:164](https://github.com/kei155/Skript.js/blob/1a5bcfd/Skript.ts#L164)

___

### groupBy

▸ **groupBy**(`arr`: *any*[], `keyName`: *string*, `keyModifier?`: (`keyValue`: *string*) => *string*): *object*

배열을 특정 키값으로 그룹핑

**`example`**
```javascript
var arrayObj = []

for (let index = 0; index < 1000; index++) {
  arrayObj.push({
    orderId: index,
    name: `주문_nico_${index}`,
    stateCode: Skript.random(1, 5),
    goodsList: [
      {
        goodsId: index + 10000,
        name: `상품_nico_${index}`,
        price: index + 30000,
        sellerId: index % 7,
      },
      {
        goodsId: index + 10000,
        name: `상품2_nico_${index}`,
        price: index + 20000,
        sellerId: index % 4,
      },
    ],
  })
}

// 첫번째 상품의 sellerId 로 묶기
console.log(Skript.groupBy(arrayObj, 'goodsList.0.sellerId'))

// 첫번째 상품의 goodsId 맨끝 두자리로 묶기
console.log(Skript.groupBy(arrayObj, 'goodsList.0.goodsId', function (goodsId) {
   return Skript.str.right(goodsId, 2)
}))

// JSON placeholder todos API 호출 후 완료여부값으로 묶기
fetch('https://jsonplaceholder.typicode.com/users/1/todos')
   .then(res => res.json())
   .then(todos => {
       console.log(Skript.groupBy(todos, 'completed'));
   })
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arr` | *any*[] | 대상 배열 |
| `keyName` | *string* | 키 이름 |
| `keyModifier?` | (`keyValue`: *string*) => *string* | 키값을 재구성하는 함수 |

**Returns:** *object*

Defined in: [Skript.ts:1304](https://github.com/kei155/Skript.js/blob/1a5bcfd/Skript.ts#L1304)

___

### querify

▸ **querify**(`obj`: *any*): *string*

데이터 요소를 전달받아 쿼리스트링으로 변환하는 메소드

**`example`**
```javascript
// '?name=%EB%8B%88%EC%BD%94&address=&school_id=&is_student=true&check_rate=44.231324222'
Skript.querify({
      name: '니코', // value는 encodeURIComponent 적용된 문자열이 적용됨
      address: null,   // null은 빈 문자열로 치환됨
      school_id: undefined, // undefined는 빈 문자열로 치환됨
      is_student: true, // boolean 값은 'true' / 'false' 문자열로 치환됨
      check_rate: 44.231324222, // 숫자값은 그대로 문자열로 치환됨
});

// '?hobbies[]=%EB%85%B8%EB%9E%98&hobbies[]=%EB%8C%84%EC%8A%A4&hobbies[]=%EC%9A%94%EB%A6%AC&subjects[]='
Skript.querify({
      hobbies: ['노래', '댄스', '요리'], // 배열은 hobbies[]=노래&hobbies[]=댄스&hobbies[]=요리 형태로 적용됨
      subjects: [], // 빈 배열은 subjects[]= 형태로 적용됨
      empty_obj: {}, // 빈 오브젝트는 추가하지 않음(이름이 없음)
});

// 배열형태 요소를 처리하는 방식
// '?tests[][grade]=1&tests[][answers][]=1&tests[][answers][]=4&tests[][answers][]=3'
Skript.querify({
      tests: [
         {
           grade: 1,
           answers: [1, 4, 3],
           func: function () {}, // 함수는 포함되지 않음
         }
      ],
});

// 중첩된 데이터를 다루는 방식
// '?extraInfo[circles][]=movie&extraInfo[circles][]=write&extraInfo[goal][target]=university&extraInfo[goal][targetDetail]=director&extraInfo[goal][availibity]=A'
Skript.querify({
      extraInfo: {
         circles: ['movie', 'write'],
         goal: {
           target: 'university',
           targetDetail: 'director',
           availibity: 'A'
         }
      },
});
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `obj` | *any* | 대상 데이터 |

**Returns:** *string*

쿼리스트링으로 만들어진 결과값

Defined in: [Skript.ts:545](https://github.com/kei155/Skript.js/blob/1a5bcfd/Skript.ts#L545)

___

### random

▸ **random**(`min`: *number*, `max`: *number*, `isFloor?`: *boolean*): *number*

지정된 범위 내의 무작위 수를 반환하는 함수

**`throws`** {Error} 최소값 또는 최대값이 누락되었거나 숫자가 아니거나 최대값이 최소값보다 작으면 예외를 발생시킴

**`example`**
```javascript
// -10과 0 사이의 무작위 정수를 반환
Skript.random(-10, 0);

// -10과 0 사이의 무작위 수를 반환
Skript.random(-10, 0, false);
```

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `min` | *number* | - | 최소값 |
| `max` | *number* | - | 최대값 |
| `isFloor` | *boolean* | true | 소수점 버림여부 |

**Returns:** *number*

Defined in: [Skript.ts:1238](https://github.com/kei155/Skript.js/blob/1a5bcfd/Skript.ts#L1238)

___

### range

▸ **range**(`start`: *number*, `end`: *number*): *number*[]

지정한 범위의 숫자 범위 배열을 생성

**`throws`** {Error} 시작값 또는 종료값이 누락되었거나 숫자가 아니거나 종료값이 시작값보다 작으면 예외를 발생시킴

**`example`**
```javascript
var arr = Skript.range(1, 5);

// [1, 2, 3, 4, 5]
console.log(arr)
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `start` | *number* | 시작값 |
| `end` | *number* | 종료값 |

**Returns:** *number*[]

Defined in: [Skript.ts:1205](https://github.com/kei155/Skript.js/blob/1a5bcfd/Skript.ts#L1205)

___

### runAction

▸ **runAction**(`selector`: *string* \| HTMLElement \| NodeList \| Window \| Document, `func`: Function, `baseElementOrDocument?`: HTMLElement): *void*

브라우저 구성요소에 이벤트를 실행하는 숏컷함수

**`throws`** Error - 호출 인자값이 유효하지 않을 때 예외를 발생시킴

**`example`**
```javascript
Skript.runAction('[data-is-new="true"]', function (targets, index) {
   this.classList.add('new');
   console.log(targets.length);
});
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `selector` | *string* \| HTMLElement \| NodeList \| Window \| Document | 대상을 선택하는 기준 |
| `func` | Function | 실행할 함수 구현 |
| `baseElementOrDocument?` | HTMLElement | - |

**Returns:** *void*

Defined in: [Skript.ts:439](https://github.com/kei155/Skript.js/blob/1a5bcfd/Skript.ts#L439)

___

### runWhenReady

▸ **runWhenReady**(`checkTarget`: *string* \| () => *boolean* \| (*string* \| () => *boolean*)[], `task`: Function, `tryCount?`: *number*, `intervalSecond?`: *number*): *void*

runWhenReady 대상이 준비되면(null,undefined가 아니게 되면) 정해진 동작을 실행하는 메소드

**`example`**
```javascript
// kakaoPixel, kakaoT, kakaoT.key 가 준비되면 task를 실행(0.5초 간격으로 10번 재시도)
Skript.runWhenReady(
 ['kakaoPixel', 'kakaoT', 'kakaoT.key', function () { return true; }],
 function () {
   kakaoPixel('132323').send(kakaoT.key);
 },
 10,
 0.5
);
```

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `checkTarget` | *string* \| () => *boolean* \| (*string* \| () => *boolean*)[] | - | 준비여부를 확인할 대상 또는 메소드 |
| `task` | Function | - | 실행할 동작 |
| `tryCount` | *number* | 0 | 재시도 횟수(0이면 계속 재시도) |
| `intervalSecond` | *number* | 1 | 재시도 간격(초) |

**Returns:** *void*

Defined in: [Skript.ts:1416](https://github.com/kei155/Skript.js/blob/1a5bcfd/Skript.ts#L1416)

___

### syncQueryParamsToPage

▸ **syncQueryParamsToPage**(`customHandlers?`: { [name: string]: (`name`: *string*, `value`: *any*, `seq`: *number*) => *void*;  }, `querystring?`: *string*): *void*

쿼리스트링을 분석해 해당하는 페이지 요소에 채워줌

**`example`**
```javascript
// 화면에서 name="checks[]" 속성을 가진 요소를 찾아 순서대로 1, 2, 3.14 값을 대입
// 화면에서 name="name" 속성을 가진 요소를 찾아 '니코' 값을 대입
// 화면에서 name="age" 속성을 가진 요소를 찾아 '19' 값을 대입
Skript.syncQueryParamsToPage(null, '?checks[]=1&checks[]=2&checks[]=3.14&name=니코&age=19');

// checks[] 항목에 대해 커스텀 핸들러 적용
// 'checks[]'
// '100'
// '1'
// 'checks[]'
// '200'
// '2'
// 'checks[]'
// '3.14'
// '3'
// *** 커스텀 핸들러가 지정된 경우 페이지에 값을 적용하지 않습니다 ***
Skript.syncQueryParamsToPage({
   'checks[]': function (name, value, seq) {
       console.log(name); // 전달한 항목명('checks[]')
       console.log(value); // 해당 키의 값(1)
       console.log(seq); // 해당 키의 순번(배열인 경우 seq 1, 2, 3 순서로 3번 호출됨)
   },
}, '?checks[]=100&checks[]=200&checks[]=3.14&name=니코&age=19');
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `customHandlers?` | *object* | - |
| `querystring?` | *string* | 분석대상이 될 쿼리스트링 (미지정시 location.search 를 사용합니다) |

**Returns:** *void*

Defined in: [Skript.ts:759](https://github.com/kei155/Skript.js/blob/1a5bcfd/Skript.ts#L759)

___

### tick

▸ **tick**(`interval`: *number*): Tick

setInterval 랩핑함수

**`example`**
```javascript
Skript.tick(0.1) // 0.1초마다 실행
   .do(function (count) {
       console.log(count); // count 값을 콘솔 출력
   })
   .until(function () {
       return this.count < 10;  // count 값이 10보다 낮은 동안 반복
   })
   .whenEnd(function () {
       console.log('tick이 종료되었을 때 실행된다');
   });
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `interval` | *number* | 실행시킬 간격(second) |

**Returns:** Tick

메소드 체이닝을 위한 tick 인스턴스

Defined in: [Skript.ts:1358](https://github.com/kei155/Skript.js/blob/1a5bcfd/Skript.ts#L1358)

___

### uuidv4

▸ **uuidv4**(): *string*

UUID 를 생성

**Returns:** *string*

Defined in: [Skript.ts:1490](https://github.com/kei155/Skript.js/blob/1a5bcfd/Skript.ts#L1490)

___

### wait

▸ **wait**(`second`: *number*): *Promise*<number\>

setTimeout 랩핑함수

**`example`**
```javascript
Skript.wait(5)
   .then(timeoutId => {
       console.log('5초 후 출력됩니다. timeout Id : ' + timeoutId);
       return false;
   })
   .then(isComplete => {
       if (isComplete !== true) {
           throw new Error('예외 발생시 catch 처리됨');
       }

       console.log('이 구문은 실행되지 않습니다.');
   })
   .catch(err => {
       // Error: 예외 발생시 catch 처리됨
       console.log(err);
   });
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `second` | *number* | 지연시킬 초(second) |

**Returns:** *Promise*<number\>

Defined in: [Skript.ts:1183](https://github.com/kei155/Skript.js/blob/1a5bcfd/Skript.ts#L1183)
