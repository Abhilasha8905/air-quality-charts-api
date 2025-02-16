interface ICacheBase {
  set(operation_id: string, key: string, value: string): void;
  get(operation_id: string, key: string): string;
}

export default ICacheBase;
