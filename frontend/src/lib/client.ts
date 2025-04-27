import { createPromiseClient } from "@connectrpc/connect";
import { createConnectTransport } from "@connectrpc/connect-web";
import { CalculatorService } from "@/gen/calculator/v1/calculator_connect";

export const client = createPromiseClient(
  CalculatorService,
  createConnectTransport({
    baseUrl: "http://localhost:8080",
  })
);