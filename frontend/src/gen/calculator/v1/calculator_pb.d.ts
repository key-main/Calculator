// @generated by protoc-gen-es v1.10.1
// @generated from file calculator.proto (package calculator.v1, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto3 } from "@bufbuild/protobuf";

/**
 * @generated from enum calculator.v1.Operator
 */
export declare enum Operator {
  /**
   * @generated from enum value: OPERATOR_ADD = 0;
   */
  ADD = 0,

  /**
   * @generated from enum value: OPERATOR_SUBTRACT = 1;
   */
  SUBTRACT = 1,

  /**
   * @generated from enum value: OPERATOR_MULTIPLY = 2;
   */
  MULTIPLY = 2,

  /**
   * @generated from enum value: OPERATOR_DIVIDE = 3;
   */
  DIVIDE = 3,
  
}

/**
 * @generated from message calculator.v1.CalculateRequest
 */
export declare class CalculateRequest extends Message<CalculateRequest> {
  /**
   * @generated from field: float a = 1;
   */
  a: number;

  /**
   * @generated from field: float b = 2;
   */
  b: number;

  /**
   * @generated from field: calculator.v1.Operator operator = 3;
   */
  operator: Operator;

  constructor(data?: PartialMessage<CalculateRequest>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "calculator.v1.CalculateRequest";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): CalculateRequest;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): CalculateRequest;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): CalculateRequest;

  static equals(a: CalculateRequest | PlainMessage<CalculateRequest> | undefined, b: CalculateRequest | PlainMessage<CalculateRequest> | undefined): boolean;
}

/**
 * @generated from message calculator.v1.CalculateResponse
 */
export declare class CalculateResponse extends Message<CalculateResponse> {
  /**
   * @generated from field: float result = 1;
   */
  result: number;

  constructor(data?: PartialMessage<CalculateResponse>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "calculator.v1.CalculateResponse";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): CalculateResponse;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): CalculateResponse;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): CalculateResponse;

  static equals(a: CalculateResponse | PlainMessage<CalculateResponse> | undefined, b: CalculateResponse | PlainMessage<CalculateResponse> | undefined): boolean;
}



