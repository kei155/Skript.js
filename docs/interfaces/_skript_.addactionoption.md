[skript](../globals.md) › ["Skript"](../modules/_skript_.md) › [AddActionOption](_skript_.addactionoption.md)

# Interface: AddActionOption

Skript.addAction 호출에서 구현되는 옵션 데이터 인터페이스

## Hierarchy

* **AddActionOption**

## Index

### Properties

* [callback](_skript_.addactionoption.md#callback)
* [eventType](_skript_.addactionoption.md#optional-eventtype)

## Properties

###  callback

• **callback**: *function*

Defined in Skript.ts:44

이벤트 콜백 구현함수 (this는 이벤트가 걸린 대상을 참조하고, 인자값으로 addAction 에 해당되었던 대상 배열을 전달한다)

#### Type declaration:

▸ (`targets`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`targets` | any[] |

___

### `Optional` eventType

• **eventType**? : *undefined | string*

Defined in Skript.ts:49

이벤트 타입 : $enter, $esc 예약을 지원함. 콤마(,)로 concat 된 다수 이벤트 타입 지원
