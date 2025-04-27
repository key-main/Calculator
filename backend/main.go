package main

import (
	"context"
	"errors"
	"fmt"
	"net/http"

	"connectrpc.com/connect"

	"golang.org/x/net/http2"
	"golang.org/x/net/http2/h2c"

	genv1 "Calculator/backend/gen/calculator/v1"
	"Calculator/backend/gen/calculator/v1/v1connect"
)

type CalculatorService struct{}

func (s *CalculatorService) Calculate(
	ctx context.Context,
	req *connect.Request[genv1.CalculateRequest],
) (*connect.Response[genv1.CalculateResponse], error) {
	op := req.Msg.Operator
	a := req.Msg.A
	b := req.Msg.B

	var result float32
	switch op {
	case genv1.Operator_OPERATOR_ADD:
		result = a + b
	case genv1.Operator_OPERATOR_SUBTRACT:
		result = a - b
	case genv1.Operator_OPERATOR_MULTIPLY:
		result = a * b
	case genv1.Operator_OPERATOR_DIVIDE:
		if b == 0 {
			return nil, connect.NewError(connect.CodeInvalidArgument, errors.New("除数不能为0"))
		}
		result = a / b
	default:
		return nil, connect.NewError(connect.CodeInvalidArgument, fmt.Errorf("invalid operator"))
	}

	return connect.NewResponse(&genv1.CalculateResponse{Result: result}), nil
}

func main() {
	calculator := &CalculatorService{}
	mux := http.NewServeMux()
	path, handler := v1connect.NewCalculatorServiceHandler(calculator)
	mux.Handle(path, handler)

	server := &http.Server{
		Addr: ":8080",
		Handler: h2c.NewHandler(
			corsMiddleware(mux),
			&http2.Server{},
		),
	}
	fmt.Println("Server listening on :8080")
	server.ListenAndServe()
}

func corsMiddleware(h http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
		w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Connect-Protocol-Version")
		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}
		h.ServeHTTP(w, r)
	})
}
