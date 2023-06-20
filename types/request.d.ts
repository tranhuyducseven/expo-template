interface RequestOptions<K> {
  method?: string;
  data?: K;
  headers?: { [key: string]: string };
}
