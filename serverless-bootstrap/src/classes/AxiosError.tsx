export class AxiosError extends Error {
  status: number;
  message: string;
  isAxiosError: boolean;

  constructor(error: any) {
    super();
    if (error.status) {
      this.status = error.status;
      this.message = this.getErrorMessage(error);
      this.isAxiosError = true;
    } else {
      this.status = -1;
      this.message = error.message || 'An unknown error occurred.';
      this.isAxiosError = false;
    }
  }

  private getErrorMessage(error: any): string {
    switch (error.status) {
      case 400:
        return 'Bad request. Please check the data sent.';
      case 403:
        return 'Unauthorized access. You do not have the required permissions.';
      case 404:
        return 'Resource not found. The requested resource does not exist.';
      case 429:
        return (
          error.response.message ??
          'Rate limit exceeded. Please try again later.'
        );
      default:
        return 'An error occurred. Please try again.';
    }
  }
}

export default AxiosError;
