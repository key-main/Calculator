package main

import (
	"context"
	"testing"

	genv1 "Calculator/backend/gen/calculator/v1"

	"connectrpc.com/connect"
	"github.com/stretchr/testify/assert"
)

func TestCalculate(t *testing.T) {
	service := &CalculatorService{}
	ctx := context.Background()

	tests := []struct {
		name        string
		req         *genv1.CalculateRequest
		wantResult  float32
		wantErrCode connect.Code
	}{
		{
			name: "addition",
			req: &genv1.CalculateRequest{
				A:        5,
				B:        3,
				Operator: genv1.Operator_OPERATOR_ADD,
			},
			wantResult: 8,
		},
		{
			name: "subtraction",
			req: &genv1.CalculateRequest{
				A:        10,
				B:        4,
				Operator: genv1.Operator_OPERATOR_SUBTRACT,
			},
			wantResult: 6,
		},
		{
			name: "multiplication",
			req: &genv1.CalculateRequest{
				A:        7,
				B:        6,
				Operator: genv1.Operator_OPERATOR_MULTIPLY,
			},
			wantResult: 42,
		},
		{
			name: "valid division",
			req: &genv1.CalculateRequest{
				A:        15,
				B:        3,
				Operator: genv1.Operator_OPERATOR_DIVIDE,
			},
			wantResult: 5,
		},
		{
			name: "division by zero",
			req: &genv1.CalculateRequest{
				A:        5,
				B:        0,
				Operator: genv1.Operator_OPERATOR_DIVIDE,
			},
			wantErrCode: connect.CodeInvalidArgument,
		},
		{
			name: "invalid operator",
			req: &genv1.CalculateRequest{
				A:        5,
				B:        3,
				Operator: 999, // 无效操作符
			},
			wantErrCode: connect.CodeInvalidArgument,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			connectReq := connect.NewRequest(tt.req)
			resp, err := service.Calculate(ctx, connectReq)

			if tt.wantErrCode != 0 {
				if err == nil {
					t.Fatal("expected error, got nil")
				}
				assert.Equal(t, tt.wantErrCode, connect.CodeOf(err))
				return
			}

			assert.NoError(t, err)
			assert.InEpsilon(t, tt.wantResult, resp.Msg.Result, 1e-6)
		})
	}
}
