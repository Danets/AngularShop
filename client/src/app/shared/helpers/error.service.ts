declare var M;

export class ErrorService {
 static handleError(error: string) {
    return M.toast({html: error})
  }
}
