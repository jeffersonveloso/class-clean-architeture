export class VoidSuccess {
  success: boolean;

  constructor({
                success
              }: {
    success: boolean
  }) {
    Object.assign(this, {
      success
    });
  }
}