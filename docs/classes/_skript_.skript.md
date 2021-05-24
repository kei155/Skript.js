[skript](../globals.md) › ["Skript"](../modules/_skript_.md) › [Skript](_skript_.skript.md)

# Class: Skript

애플리케이션 스케일 클래스

**`classdesc`** 애플리케이션에서 사용하는 스크립트에 대한 관리를 총괄

**`requires`** module:axios

**`requires`** module:md5

**`requires`** module:MMDate

## Hierarchy

* **Skript**

## Index

### Constructors

* [constructor](_skript_.skript.md#constructor)

### Properties

* [_loadRouteEndpoint](_skript_.skript.md#_loadrouteendpoint)
* [callbacks](_skript_.skript.md#callbacks)
* [diffInTimeServerToScript](_skript_.skript.md#optional-diffintimeservertoscript)
* [editors](_skript_.skript.md#editors)
* [initializePromise](_skript_.skript.md#initializepromise)
* [instanceCreatedAt](_skript_.skript.md#instancecreatedat)
* [isInitialized](_skript_.skript.md#isinitialized)
* [md5](_skript_.skript.md#md5)
* [routes](_skript_.skript.md#routes)
* [serverNowDatetime](_skript_.skript.md#optional-servernowdatetime)
* [vues](_skript_.skript.md#vues)

### Methods

* [addAction](_skript_.skript.md#addaction)
* [clone](_skript_.skript.md#clone)
* [countdown](_skript_.skript.md#countdown)
* [extract](_skript_.skript.md#extract)
* [extractFormData](_skript_.skript.md#extractformdata)
* [extractJson](_skript_.skript.md#extractjson)
* [getQueryParam](_skript_.skript.md#getqueryparam)
* [getQueryParams](_skript_.skript.md#getqueryparams)
* [getRouteParamAt](_skript_.skript.md#getrouteparamat)
* [getRouteParams](_skript_.skript.md#getrouteparams)
* [getRouteParamsByName](_skript_.skript.md#getrouteparamsbyname)
* [groupBy](_skript_.skript.md#groupby)
* [init](_skript_.skript.md#init)
* [loadRoutes](_skript_.skript.md#loadroutes)
* [querify](_skript_.skript.md#querify)
* [random](_skript_.skript.md#random)
* [range](_skript_.skript.md#range)
* [route](_skript_.skript.md#route)
* [runAction](_skript_.skript.md#runaction)
* [runWhenReady](_skript_.skript.md#runwhenready)
* [setServerNowDatetime](_skript_.skript.md#setservernowdatetime)
* [syncQueryParamsToPage](_skript_.skript.md#syncqueryparamstopage)
* [tick](_skript_.skript.md#tick)
* [uuidv4](_skript_.skript.md#uuidv4)
* [wait](_skript_.skript.md#wait)

### Object literals

* [ajax](_skript_.skript.md#ajax)
* [dom](_skript_.skript.md#dom)
* [is](_skript_.skript.md#is)
* [number](_skript_.skript.md#number)
* [pageScripts](_skript_.skript.md#pagescripts)
* [str](_skript_.skript.md#str)

## Constructors

###  constructor

\+ **new Skript**(): *[Skript](_skript_.skript.md)*

Defined in Skript.ts:115

**Returns:** *[Skript](_skript_.skript.md)*

## Properties

###  _loadRouteEndpoint

• **_loadRouteEndpoint**: *string* = "/common/routes"

Defined in Skript.ts:149

route fetch endpoint

___

###  callbacks

• **callbacks**: *any*

Defined in Skript.ts:2703

콜백 메소드를 거치해놓기 위한 번들 객체

___

### `Optional` diffInTimeServerToScript

• **diffInTimeServerToScript**? : *undefined | number*

Defined in Skript.ts:138

서버시간과 서버시간 확정 스크립트 실행까지의 간격

___

###  editors

• **editors**: *object*

Defined in Skript.ts:123

에디터 관리 객체

#### Type declaration:

___

###  initializePromise

• **initializePromise**: *Promise‹any› | null* = null

Defined in Skript.ts:144

___

###  instanceCreatedAt

• **instanceCreatedAt**: *Date*

Defined in Skript.ts:128

인스턴스 생성된 시간

___

###  isInitialized

• **isInitialized**: *boolean* = false

Defined in Skript.ts:143

앱 인스턴스 초기화 완료 여부

___

###  md5

• **md5**: *md5* = md5

Defined in Skript.ts:2691

MD5 암호화 함수

**`example`** 
```javascript
// return '410ec15153a6dff0bed851467309bcbd'
Skript.md5('nico');
```

___

###  routes

• **routes**: *any[]* = []

Defined in Skript.ts:2489

라우트 데이터를 보관하는 변수

___

### `Optional` serverNowDatetime

• **serverNowDatetime**? : *Date*

Defined in Skript.ts:133

서버에서 전달해준 현재시간

___

###  vues

• **vues**: *any*

Defined in Skript.ts:2708

각 페이지에서 뷰 인스턴스를 관리하기 위한 번들 객체

## Methods

###  addAction

▸ **addAction**(`selector`: string | HTMLElement | NodeList | Window | Document, `args`: Function | [AddActionOption](../interfaces/_skript_.addactionoption.md)): *void*

Defined in Skript.ts:566

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

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`selector` | string &#124; HTMLElement &#124; NodeList &#124; Window &#124; Document | 대상을 선택하는 기준 |
`args` | Function &#124; [AddActionOption](../interfaces/_skript_.addactionoption.md) | 추가옵션 |

**Returns:** *void*

___

###  clone

▸ **clone**(`value`: any): *any*

Defined in Skript.ts:503

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

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`value` | any | 복사할 대상 |

**Returns:** *any*

복사된 결과

___

###  countdown

▸ **countdown**(`targetDatetime`: Date | string, `intervalType`: string, `countdownHandler`: function, `excuteOnInitialized`: boolean): *Promise‹void›*

Defined in Skript.ts:2406

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

**Parameters:**

▪ **targetDatetime**: *Date | string*

카운트다운 목표 시간

▪ **intervalType**: *string*

카운트다운 간격(ms/millisecond/s/second/m/minute)

▪ **countdownHandler**: *function*

카운트다운 처리자

▸ (`diffInmillisecond`: number, `diffs`: any): *void*

**Parameters:**

Name | Type |
------ | ------ |
`diffInmillisecond` | number |
`diffs` | any |

▪`Default value`  **excuteOnInitialized**: *boolean*= false

초기화시점에 handler를 1회 실행시킬지 여부

**Returns:** *Promise‹void›*

___

###  extract

▸ **extract**(`selector`: string, `options?`: [ExtractOption](../interfaces/_skript_.extractoption.md)): *object | FormData*

Defined in Skript.ts:1073

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

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`selector` | string | 대상 엘리먼트를 특정할 수 있는 CSS 셀렉터 |
`options?` | [ExtractOption](../interfaces/_skript_.extractoption.md) | 추가옵션 |

**Returns:** *object | FormData*

추출된 결과데이터

___

###  extractFormData

▸ **extractFormData**(`element`: Element, `appends?`: any): *FormData*

Defined in Skript.ts:1207

**`brief`** 엘리먼트에서 FormData 인스턴스 추출 (extract 함수의 타입 축약형)

**`example`** 
```javascript
Skript.extractFormData(document.querySelector('#form'), {
   name: '니코',
   age: 19
})
```

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`element` | Element | 폼데이터 인스턴스를 추출할 엘리먼트 |
`appends?` | any | 취합할 데이터(같은 이름 데이터가 element 하위에 있는 경우 appends 에 있는 값은 덮어씌워짐) |

**Returns:** *FormData*

FormData

___

###  extractJson

▸ **extractJson**(`element`: Element, `appends?`: any): *any*

Defined in Skript.ts:1112

엘리먼트에서 JavaScript Object 인스턴스 추출 (extract 함수의 타입 축약형)

**`example`** 
```javascript
Skript.extractJson(document.querySelector('#form'), {
   name: '니코',
   age: 19
})
```

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`element` | Element | 폼데이터 인스턴스를 추출할 엘리먼트 |
`appends?` | any | 취합할 데이터(같은 이름 데이터가 element 하위에 있는 경우 appends 에 있는 값은 덮어씌워짐) |

**Returns:** *any*

Object

___

###  getQueryParam

▸ **getQueryParam**(`paramKey`: string, `querystring?`: undefined | string): *string | number | object*

Defined in Skript.ts:301

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

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`paramKey` | string | 조회할 쿼리스트링 키 |
`querystring?` | undefined &#124; string | 분석대상이 될 쿼리스트링 (미지정시 location.search 를 사용합니다) |

**Returns:** *string | number | object*

해당 키에 해당하는 값

___

###  getQueryParams

▸ **getQueryParams**(`querystring?`: undefined | string): *[QueryParameters](../interfaces/_skript_.queryparameters.md)*

Defined in Skript.ts:349

쿼리스트링을 분해하여 반환

**`example`** 
```javascript
// return { checks: [1, 2, 3.14] }
Skript.getQueryParams('?checks[]=1&checks[]=2&checks[]=3.14');

// return { data: { name: "니코", age: 19, grade: 3 }, link: 'http://google.com' }
Skript.getQueryParams('?data[name]=니코&data[age]=19&data[grade]=3&link=http://google.com');
```

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`querystring?` | undefined &#124; string | 분석대상이 될 쿼리스트링 (미지정시 location.search 를 사용합니다) |

**Returns:** *[QueryParameters](../interfaces/_skript_.queryparameters.md)*

쿼리 파라미터 구조체

___

###  getRouteParamAt

▸ **getRouteParamAt**(`position`: number, `pathname?`: undefined | string): *string | null*

Defined in Skript.ts:269

특정 위치의 라우트 파라미터를 획득

**`example`** 
```javascript
// return 'best'
Skript.getRouteParamAt(3, '/goods/brand/130/best');

// return '130'
Skript.getRouteParamAt(-2, '/goods/brand/130/best');
```

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`position` | number | 조회할 위치값(음수의 경우 마지막부터 조회 : -1이 가장 뒤, -2는 뒤에서 두 번째) |
`pathname?` | undefined &#124; string | 분석대상이 될 경로 (미지정시 location.pathname 을 사용합니다) |

**Returns:** *string | null*

해당 위치의 값

___

###  getRouteParams

▸ **getRouteParams**(`pattern`: string, `pathname?`: undefined | string): *[RouteParameters](../interfaces/_skript_.routeparameters.md)*

Defined in Skript.ts:195

라우트 파라미터 조회

**`example`** 
```javascript
// 패턴에 맞춰 해체결과 객체를 반환
// return { type: 'goods', goodsId: '411', action: 'edit' }
Skript.getRouteParams('/{type}/{goodsId}/{action}', '/goods/411/edit')

// 사용하지 않을 파라미터는 생략가능
// n만큼 건너뛰기
// return { fileName: 'c', fileId: 'f' }
Skript.getRouteParams('/...2/{fileName}/...2/{fileId}', '/a/b/c/d/e/f/g');
// '{_}' 패턴을 사용해 명시적 생략
// return { fileId: 'd' }
Skript.getRouteParams('/{_}/{_}/{_}/{fileId}', '/a/b/c/d/e/f/g')
```

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`pattern` | string | 분석에 사용할 패턴 |
`pathname?` | undefined &#124; string | 분석대상이 될 경로 (미지정시 location.pathname 을 사용합니다) |

**Returns:** *[RouteParameters](../interfaces/_skript_.routeparameters.md)*

해체분석된 결과 데이터 객체

___

###  getRouteParamsByName

▸ **getRouteParamsByName**(`routeName`: string, `pathname?`: undefined | string): *[RouteParameters](../interfaces/_skript_.routeparameters.md)*

Defined in Skript.ts:164

라우트 이름으로 파라미터를 추출

**`example`** 
```javascript
// Skript.route('sample.develop.detail') 의 path 값이 /sample/develop/{id}/{action} 이며
// 현재 location.pathname 이 https://example.com/sample/develop/1664/edit 인 경우
// return { id: '1664', action: 'edit' }
Skript.getRouteParamsByName('sample.develop.detail')
```

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`routeName` | string | 분석에 사용할 라우트 이름 |
`pathname?` | undefined &#124; string | 분석대상이 될 경로 (미지정시 location.pathname 을 사용합니다) |

**Returns:** *[RouteParameters](../interfaces/_skript_.routeparameters.md)*

해체분석된 결과 데이터 객체

___

###  groupBy

▸ **groupBy**(`arr`: any[], `keyName`: string, `keyModifier?`: undefined | function): *object*

Defined in Skript.ts:1453

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

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`arr` | any[] | 대상 배열 |
`keyName` | string | 키 이름 |
`keyModifier?` | undefined &#124; function | 키값을 재구성하는 함수 |

**Returns:** *object*

* \[ **keyValue**: *string*\]: any

___

###  init

▸ **init**(`initializer?`: undefined | function): *Promise‹[Skript](_skript_.skript.md)›*

Defined in Skript.ts:2602

모든 페이지에서 적용해야하는 앱 초기화 함수
앱 페이지가 작동하기 전 실행되어야하는 비동기 액션을 실행한 후 프로미스를 반환

**`example`** 
```javascript
App
// init 함수에 app 인스턴스를 인자로 하는 추가 이니셜라이저를 사용할 수 있음
.init(function (app) {
   console.log('init Skript. :: ', app);
})
.then(function () {
   // 화면에 사용하는 스크립트 작성
})
```

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`initializer?` | undefined &#124; function | 개별적으로 추가실행할 초기화 함수 |

**Returns:** *Promise‹[Skript](_skript_.skript.md)›*

___

###  loadRoutes

▸ **loadRoutes**(): *Promise‹any›*

Defined in Skript.ts:2495

라우트 데이터 조회 메소드

**Returns:** *Promise‹any›*

___

###  querify

▸ **querify**(`obj`: any): *string*

Defined in Skript.ts:733

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

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`obj` | any | 대상 데이터 |

**Returns:** *string*

쿼리스트링으로 만들어진 결과값

___

###  random

▸ **random**(`min`: number, `max`: number, `isFloor`: boolean): *number*

Defined in Skript.ts:1387

지정된 범위 내의 무작위 수를 반환하는 함수

**`throws`** {Error} 최소값 또는 최대값이 누락되었거나 숫자가 아니거나 최대값이 최소값보다 작으면 예외를 발생시킴

**`example`** 
```javascript
// -10과 0 사이의 무작위 정수를 반환
Skript.random(-10, 0);

// -10과 0 사이의 무작위 수를 반환
Skript.random(-10, 0, false);
```

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`min` | number | - | 최소값 |
`max` | number | - | 최대값 |
`isFloor` | boolean | true | 소수점 버림여부 |

**Returns:** *number*

___

###  range

▸ **range**(`start`: number, `end`: number): *number[]*

Defined in Skript.ts:1354

지정한 범위의 숫자 범위 배열을 생성

**`throws`** {Error} 시작값 또는 종료값이 누락되었거나 숫자가 아니거나 종료값이 시작값보다 작으면 예외를 발생시킴

**`example`** 
```javascript
var arr = Skript.range(1, 5);

// [1, 2, 3, 4, 5]
console.log(arr)
```

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`start` | number | 시작값 |
`end` | number | 종료값 |

**Returns:** *number[]*

___

###  route

▸ **route**(`name`: string, `parameters?`: undefined | object): *string*

Defined in Skript.ts:2519

라우트 경로 생성 메소드

**`throws`** Error - 존재하지 않는 라우트 이름이거나, 파라미터가 유효하지 않으면 예외를 발생시킴

**`example`** 
```javascript
// return '/goods/detail/134?affiliate=naver'
Skript.route('goods.detail', { goodsId: 134, affliate: 'naver' });
// 라우트 파라미터에 해당하지 않는 값을 parameters 값으로 넘기면 쿼리 파라미터로 생성함
```

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`name` | string | 라우트 이름 |
`parameters?` | undefined &#124; object | 라우트 경로 생성에 사용할 파라미터 값 데이터 오브젝트 |

**Returns:** *string*

생성된 경로

___

###  runAction

▸ **runAction**(`selector`: string | HTMLElement | NodeList | Window | Document, `func`: Function): *void*

Defined in Skript.ts:641

브라우저 구성요소에 이벤트를 실행하는 숏컷함수

**`throws`** Error - 호출 인자값이 유효하지 않을 때 예외를 발생시킴

**`example`** 
```javascript
Skript.runAction('[data-is-new="true"]', function (targets) {
   this.classList.add('new');
   console.log(targets.length);
});
```

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`selector` | string &#124; HTMLElement &#124; NodeList &#124; Window &#124; Document | 대상을 선택하는 기준 |
`func` | Function | 실행할 함수 구현 |

**Returns:** *void*

___

###  runWhenReady

▸ **runWhenReady**(`checkTarget`: string | function | string | function[], `task`: Function, `tryCount`: number, `intervalSecond`: number): *void*

Defined in Skript.ts:1565

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

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`checkTarget` | string &#124; function &#124; string &#124; function[] | - | 준비여부를 확인할 대상 또는 메소드 |
`task` | Function | - | 실행할 동작 |
`tryCount` | number | 0 | 재시도 횟수(0이면 계속 재시도) |
`intervalSecond` | number | 1 | 재시도 간격(초) |

**Returns:** *void*

___

###  setServerNowDatetime

▸ **setServerNowDatetime**(`serverNowDatetime`: Date | string): *void*

Defined in Skript.ts:2352

앱 스크립트 인스턴스에 서버 현재시간을 반영
서버의 시간과 클라이언트의 시간 사이에 발생하는 차이를 잡기 위해 사용하는 메소드.
앱 인스턴스 생성 시간과 서버의 현재시간, 서버 시간을 적용하는 시점의 시간을 보정해야 함
(현재 구성만 잡아놓고 실제 보정로직 완료되지 않았음)

**`throws`** Error serverNowDatetime이 Date 타입으로 변경 불가능한 경우 예외를 발생시킴

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`serverNowDatetime` | Date &#124; string | 서버에서 발생한 현재시간값 |

**Returns:** *void*

___

###  syncQueryParamsToPage

▸ **syncQueryParamsToPage**(`customHandlers?`: undefined | object, `querystring?`: undefined | string): *void*

Defined in Skript.ts:947

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

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`customHandlers?` | undefined &#124; object | - |
`querystring?` | undefined &#124; string | 분석대상이 될 쿼리스트링 (미지정시 location.search 를 사용합니다) |

**Returns:** *void*

___

###  tick

▸ **tick**(`interval`: number): *[Tick](../interfaces/_skript_.tick.md)*

Defined in Skript.ts:1507

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

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`interval` | number | 실행시킬 간격(second) |

**Returns:** *[Tick](../interfaces/_skript_.tick.md)*

메소드 체이닝을 위한 tick 인스턴스

___

###  uuidv4

▸ **uuidv4**(): *string*

Defined in Skript.ts:1639

UUID 를 생성

**Returns:** *string*

___

###  wait

▸ **wait**(`second`: number): *Promise‹number›*

Defined in Skript.ts:1332

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

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`second` | number | 지연시킬 초(second) |

**Returns:** *Promise‹number›*

## Object literals

###  ajax

### ▪ **ajax**: *object*

Defined in Skript.ts:520

ajax 요청용 랩핑 프로퍼티

###  _app

• **_app**: *this* = this

Defined in Skript.ts:521

###  get

• **get**: *get* = axios.get

Defined in Skript.ts:522

###  post

• **post**: *post* = axios.post

Defined in Skript.ts:523

###  delete

▸ **delete**(`url`: string, `config?`: any): *Promise‹AxiosResponse‹any››*

Defined in Skript.ts:533

**Parameters:**

Name | Type |
------ | ------ |
`url` | string |
`config?` | any |

**Returns:** *Promise‹AxiosResponse‹any››*

###  put

▸ **put**(`url`: string, `data?`: any, `config?`: any): *Promise‹AxiosResponse‹any››*

Defined in Skript.ts:524

**Parameters:**

Name | Type |
------ | ------ |
`url` | string |
`data?` | any |
`config?` | any |

**Returns:** *Promise‹AxiosResponse‹any››*

___

###  dom

### ▪ **dom**: *object*

Defined in Skript.ts:1727

dom 관련 헬퍼함수

###  app

• **app**: *this* = this

Defined in Skript.ts:1731

**`var`** Skript

###  count

▸ **count**(`selector`: string | any[], `filter?`: undefined | function): *number*

Defined in Skript.ts:1901

셀렉터에 해당하는 요소 갯수를 구하는 메소드

**`throws`** Error - 유효하지 않은 셀렉터인 경우 예외를 발생시킴

**`example`** 
```javascript
// input type text 엘리먼트 중에서 숫자값이고 3의 배수인 갯수를 조회하기
Skript.count(
   'input[type="text"]',
   (item) => {
       return !isNaN(item.value) && Number.parseInt(item.value) % 3 === 0;
   }
)

// 문자열 배열에서 'nico'가 포함된 항목의 갯수를 구하기
Skript.count(
   ['niconico', 'noconoco', 'nice', 'freedom'],
   (str) => {
     return Skript.str.contains(str, 'nico');
   }
);
```

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`selector` | string &#124; any[] | css 셀렉터 문자열 또는 배열 |
`filter?` | undefined &#124; function | 셀렉팅 된 요소를 순회하며 수행할 추가조건 필터함수 |

**Returns:** *number*

해당하는 갯수(필터가 지정된 경우 필터까지 적용되어 해당되는 갯수)

###  inputOnly

▸ **inputOnly**(`targetElement`: HTMLElement, `type`: string, `onKeyup`: boolean): *void*

Defined in Skript.ts:1751

**`example`** 
```html
<input type="text" id="input_element" />
```
```javascript
// 숫자만 입력할 수 있도록 제한
var targetElement = document.getElementById('input_element');
Skript.dom.inputOnly(targetElement, 'number');

// 숫자만 입력할 수 있도록 제한(keyup)
Skript.dom.inputOnly(targetElement, 'number', true);
```

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`targetElement` | HTMLElement | - | 대상 엘리먼트 |
`type` | string | - | 제한타입(number: 숫자만, korean: 한글만) |
`onKeyup` | boolean | false | 이벤트 시점을 keyup으로 적용할지 여부(기본은 change 시점 검사) |

**Returns:** *void*

###  pluckAttribute

▸ **pluckAttribute**(`cssSelector`: string, `attributeName`: string, `filter?`: undefined | function): *Array‹any›*

Defined in Skript.ts:1858

**`example`** 
```html
<input type="checkbox" name="targets" data-name="nico" class="__on" value="1" checked />
<input type="checkbox" name="targets" data-name="lulu" value="2" />
<input type="checkbox" name="targets" data-name="pike" value="3" checked />
```
```javascript
// return ['nico', 'pike']
Skript.dom.pluckValue('[name="targets"]:checked', 'data-name');

// return ['nico']
Skript.dom.pluckValue('[name="targets"]:checked', 'data-name', function (__el) {
   return __el.className.indexOf('__on') > -1;
}});
```

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`cssSelector` | string | 대상을 추적할 CSS Selector 문자열 |
`attributeName` | string | 추출할 아트리뷰트 이름 |
`filter?` | undefined &#124; function | 추가 필터링 함수 |

**Returns:** *Array‹any›*

대상의 value 배열

###  pluckValue

▸ **pluckValue**(`cssSelector`: string, `filter?`: undefined | function): *Array‹any›*

Defined in Skript.ts:1811

**`example`** 
```html
<input type="checkbox" name="targets" class="__on" value="1" checked />
<input type="checkbox" name="targets" value="2" />
<input type="checkbox" name="targets" value="3" checked />
```
```javascript
// return [1, 3]
Skript.dom.pluckValue('[name="targets"]:checked');

// return [1]
Skript.dom.pluckValue('[name="targets"]:checked', function (__el) {
   return __el.className.indexOf('__on') > -1;
}});
```

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`cssSelector` | string | 대상을 추적할 CSS Selector 문자열 |
`filter?` | undefined &#124; function | 추가 필터링 함수 |

**Returns:** *Array‹any›*

대상의 value 배열

___

###  is

### ▪ **is**: *object*

Defined in Skript.ts:1652

is 체크를 할 수 있는 테스터 객체

###  array

▸ **array**(`value`: any): *boolean*

Defined in Skript.ts:1666

주어진 값이 배열인지 체크

**Parameters:**

Name | Type |
------ | ------ |
`value` | any |

**Returns:** *boolean*

###  empty

▸ **empty**(`value`: any): *boolean*

Defined in Skript.ts:1691

주어진 값이 비어있는지 체크
null, undefined, 빈 배열, 빈 오브젝트({}), 빈 문자열, 공백으로만 이루어진 문자열에 true 값을 반환

**Parameters:**

Name | Type |
------ | ------ |
`value` | any |

**Returns:** *boolean*

###  function

▸ **function**(`value`: any): *boolean*

Defined in Skript.ts:1711

주어진 값이 함수인지 체크

**Parameters:**

Name | Type |
------ | ------ |
`value` | any |

**Returns:** *boolean*

###  null

▸ **null**(`value`: any): *boolean*

Defined in Skript.ts:1674

주어진 값이 null 인지 체크

**Parameters:**

Name | Type |
------ | ------ |
`value` | any |

**Returns:** *boolean*

###  number

▸ **number**(`value`: any): *boolean*

Defined in Skript.ts:1658

숫자 또는 숫자로 변환할 수 있는 값인지 체크

**Parameters:**

Name | Type |
------ | ------ |
`value` | any |

**Returns:** *boolean*

###  string

▸ **string**(`value`: any): *boolean*

Defined in Skript.ts:1719

주어진 값이 문자열인지 체크

**Parameters:**

Name | Type |
------ | ------ |
`value` | any |

**Returns:** *boolean*

###  undefined

▸ **undefined**(`value`: any): *boolean*

Defined in Skript.ts:1682

주어진 값이 undefined 인지 체크

**Parameters:**

Name | Type |
------ | ------ |
`value` | any |

**Returns:** *boolean*

___

###  number

### ▪ **number**: *object*

Defined in Skript.ts:1938

숫자 관련 헬퍼함수

###  comma

▸ **comma**(`value`: number): *string*

Defined in Skript.ts:1949

주어진 숫자값을 3자리 단위로 콤마처리

**`example`** 
```javascript
// '140,000,010'
Skript.number.comma(140000010);
```

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`value` | number | 숫자값 |

**Returns:** *string*

___

###  pageScripts

### ▪ **pageScripts**: *object*

Defined in Skript.ts:2696

각 페이지에서 네임스페이스를 적용하기 위한 번들 객체

###  common

• **common**: *object*

Defined in Skript.ts:2697

#### Type declaration:

___

###  str

### ▪ **str**: *object*

Defined in Skript.ts:1966

문자열 관련 헬퍼함수

###  contains

▸ **contains**(`value`: string, `check`: string): *boolean*

Defined in Skript.ts:1981

주어진 문자열에 해당 값이 존재하는지 체크

**`example`** 
```javascript
// return true
Skript.str.contains('future style nico', 'nico');

// return false
Skript.str.contains('future style nico', 'past');
```

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`value` | string | 검사 대상 문자열 |
`check` | string | 검사할 문자열 |

**Returns:** *boolean*

###  containsAll

▸ **containsAll**(`value`: string, `checks`: string[]): *boolean*

Defined in Skript.ts:2003

주어진 문자열에 해당 배열의 값이 모두 존재하는지 체크

**`example`** 
```javascript
// return true
Skript.str.containsAll('future style nico', ['nico', 'style']);

// return false
Skript.str.containsAll('future style nico', ['nico', 'past']);
```

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`value` | string | 검사 대상 문자열 |
`checks` | string[] | - |

**Returns:** *boolean*

###  containsAny

▸ **containsAny**(`value`: string, `checks`: string[]): *boolean*

Defined in Skript.ts:2030

주어진 문자열에 해당 배열의 값중에 하나라도 존재하는지 체크

**`example`** 
```javascript
// return true
Skript.str.containsAny('future style nico', ['nico', 'past']);

// return false
Skript.str.containsAny('future style nico', ['sick', 'past']);
```

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`value` | string | 검사 대상 문자열 |
`checks` | string[] | - |

**Returns:** *boolean*

###  endsWith

▸ **endsWith**(`value`: string, `check`: string | string[]): *boolean*

Defined in Skript.ts:2057

주어진 문자열에 해당 값으로 끝나는지 체크

**`example`** 
```javascript
// return true
Skript.str.endsWith('future style nico', ['nico', 'nami']);

// return false
Skript.str.endsWith('future style nico', 'style');
```

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`value` | string | 검사 대상 문자열 |
`check` | string &#124; string[] | 검사할 문자열 또는 배열(or 체크) |

**Returns:** *boolean*

###  finish

▸ **finish**(`value`: string, `ends`: string): *string*

Defined in Skript.ts:2090

주어진 문자열에 해당 값으로 끝난다면 주어진 문자열을, 해당 값으로 끝나지 않는다면 해당 값을 붙여 반환

**`example`** 
```javascript
// return 'nico.jpg'
Skript.str.finish('nico', '.jpg');

// return 'nico.jpg'
Skript.str.finish('nico.jpg', '.jpg');
```

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`value` | string | 검사 대상 문자열 |
`ends` | string | 검사할 문자열 |

**Returns:** *string*

###  left

▸ **left**(`text`: string, `length`: number): *string*

Defined in Skript.ts:2323

문자열의 왼쪽부터 지정된 길이를 반환

**`example`** 
```javascript
// 'Ni'
Skript.str.left('Nico', 2)
```

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`text` | string | 대상 문자열 |
`length` | number | 자를 길이 |

**Returns:** *string*

###  limit

▸ **limit**(`value`: string, `limitLength`: number, `limitMark`: string): *string*

Defined in Skript.ts:2162

문자열 길이를 제한(초과시 축약 문자열을 붙여 반환)

**`example`** 
```javascript
// return 'nico...'
Skript.str.limit('nico future style', 4);
```

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`value` | string | - | 대상 문자열 |
`limitLength` | number | - | 제한할 문자열 길이 |
`limitMark` | string | "..." | 축약 문자열(기본: '...') |

**Returns:** *string*

###  padLeft

▸ **padLeft**(`value`: string, `length`: number, `padString`: string): *string*

Defined in Skript.ts:2246

left pad 처리

**`example`** 
```javascript
// returns '0000000001'
Skript.str.padLeft('1', 10, '0')

// 패딩 문자가 단일 문자가 아닌 경우, 임의절삭하지 않고 최소 길이와 같거나 이상이 될때까지 패딩처리함
// returns 'abcdabcdOK'
Skript.str.padLeft('OK', 8, 'abcd')
// length 값은 8이지만, 'abcd'를 1회 패딩할 경우 'abcdOK' 가 되어 8자리가 되지 않으므로 한 번 더 패딩해 'abcdabcdOK'를 반환 (10자리)
```

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`value` | string | 대상 문자열 |
`length` | number | 보정할 최소길이 |
`padString` | string | 패딩 문자 |

**Returns:** *string*

###  padRight

▸ **padRight**(`value`: string, `length`: number, `padString`: string): *string*

Defined in Skript.ts:2267

right pad 처리

**`example`** 
```javascript
// returns '1000000000'
Skript.str.padRight('1', 10, '0')

// 패딩 문자가 단일 문자가 아닌 경우, 임의절삭하지 않고 최소 길이와 같거나 이상이 될때까지 패딩처리함
// returns 'OKabcdabcd'
Skript.str.padRight('OK', 8, 'abcd')
// length 값은 8이지만, 'abcd'를 1회 패딩할 경우 'OKabcd' 가 되어 8자리가 되지 않으므로 한 번 더 패딩해 'OKabcdabcd'를 반환 (10자리)
```

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`value` | string | 대상 문자열 |
`length` | number | 보정할 최소길이 |
`padString` | string | 패딩 문자 |

**Returns:** *string*

###  reverseLimit

▸ **reverseLimit**(`value`: string, `limitLength`: number, `limitMark`: string): *string*

Defined in Skript.ts:2189

문자열 길이를 뒤에서부터 제한(초과시 축약 문자열을 붙여 반환)

**`example`** 
```javascript
// return '~yle'
Skript.str.reverseLimit('nico future style', 3, '~');
```

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`value` | string | - | 대상 문자열 |
`limitLength` | number | - | 제한할 문자열 길이 |
`limitMark` | string | "..." | 축약 문자열(기본: '...') |

**Returns:** *string*

###  right

▸ **right**(`text`: string, `length`: number): *string*

Defined in Skript.ts:2338

문자열의 오른쪽부터 지정된 길이를 반환

**`example`** 
```javascript
// 'co'
Skript.str.right('Nico', 2)
```

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`text` | string | 대상 문자열 |
`length` | number | 자를 길이 |

**Returns:** *string*

###  start

▸ **start**(`value`: string, `starts`: string): *string*

Defined in Skript.ts:2142

주어진 문자열에 해당 값으로 시작한다면 주어진 문자열을, 해당 값으로 시작하지 않는다면 해당 값을 붙여 반환

**`example`** 
```javascript
// return '/goods/133'
Skript.str.start('goods/133', '/');

// return '/goods/133'
Skript.str.start('/goods/133', '/');
```

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`value` | string | 검사 대상 문자열 |
`starts` | string | 검사할 문자열 |

**Returns:** *string*

###  startsWith

▸ **startsWith**(`value`: string, `check`: string | string[]): *boolean*

Defined in Skript.ts:2112

주어진 문자열에 해당 값으로 시작하는지 체크

**`example`** 
```javascript
// return true
Skript.str.startsWith('future style nico', 'future');

// return false
Skript.str.startsWith('future style nico', ['style', 'nico']);
```

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`value` | string | 검사 대상 문자열 |
`check` | string &#124; string[] | 검사할 문자열 또는 배열(or 체크) |

**Returns:** *boolean*

###  wrap

▸ **wrap**(`value`: string, `target`: string, `before`: string, `after`: string): *string*

Defined in Skript.ts:2217

문자열 내부의 특정 문자열을 주어진 값으로 감싸 반환

**`example`** 
```javascript
// return 'future style <b>nico</b> attack <b>nico</b> double <b>nico</b> star'
Skript.str.wrap('future style nico attack nico double nico star', 'nico', '<b>', '</b>');
```

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`value` | string | - | 전체 문자열 |
`target` | string | - | 감싸줄 특정 문자열 |
`before` | string | "" | 앞부분 |
`after` | string | "" | 뒷부분 |

**Returns:** *string*
