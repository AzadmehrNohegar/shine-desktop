import { errorResponse } from "@model/general";

function serializedError(reason: string): errorResponse {
  return {
    reason,
  };
}

export { serializedError };
