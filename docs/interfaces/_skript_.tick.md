[@owneul/skript](../README.md) › [Globals](../globals.md) › ["Skript"](../modules/_skript_.md) › [Tick](_skript_.tick.md)

# Interface: Tick

interval을 관리하기 위한 구조체

## Hierarchy

* **Tick**

## Index

### Properties

* [count](_skript_.tick.md#count)
* [do](_skript_.tick.md#do)
* [endHandler](_skript_.tick.md#endhandler)
* [intervalId](_skript_.tick.md#intervalid)
* [tester](_skript_.tick.md#tester)
* [until](_skript_.tick.md#until)
* [whenEnd](_skript_.tick.md#whenend)

## Properties

###  count

• **count**: *number*

*Defined in [Skript.ts:79](https://github.com/kei155/Skript.js/blob/3b19926/Skript.ts#L79)*

tick 된 횟수

___

###  do

• **do**: *function*

*Defined in [Skript.ts:94](https://github.com/kei155/Skript.js/blob/3b19926/Skript.ts#L94)*

interval 동안 실행 될 함수

#### Type declaration:

▸ (`action`: function): *[Tick](_skript_.tick.md)*

**Parameters:**

▪ **action**: *function*

▸ (`count?`: undefined | number): *void*

**Parameters:**

Name | Type |
------ | ------ |
`count?` | undefined &#124; number |

___

###  endHandler

• **endHandler**: *function*

*Defined in [Skript.ts:89](https://github.com/kei155/Skript.js/blob/3b19926/Skript.ts#L89)*

종료시 실행할 메소드

#### Type declaration:

▸ (): *void*

___

###  intervalId

• **intervalId**: *number*

*Defined in [Skript.ts:74](https://github.com/kei155/Skript.js/blob/3b19926/Skript.ts#L74)*

interval 고유키

___

###  tester

• **tester**: *function*

*Defined in [Skript.ts:84](https://github.com/kei155/Skript.js/blob/3b19926/Skript.ts#L84)*

종료여부를 확인하기 위한 테스터 메소드

#### Type declaration:

▸ (): *boolean*

___

###  until

• **until**: *function*

*Defined in [Skript.ts:99](https://github.com/kei155/Skript.js/blob/3b19926/Skript.ts#L99)*

종료여부를 확인할 메소드

#### Type declaration:

▸ (`tester`: function): *[Tick](_skript_.tick.md)*

**Parameters:**

▪ **tester**: *function*

▸ (): *boolean*

___

###  whenEnd

• **whenEnd**: *function*

*Defined in [Skript.ts:104](https://github.com/kei155/Skript.js/blob/3b19926/Skript.ts#L104)*

종료되었을 때 실행할 메소드 지정

#### Type declaration:

▸ (`endHandler`: function): *[Tick](_skript_.tick.md)*

**Parameters:**

▪ **endHandler**: *function*

▸ (): *void*
