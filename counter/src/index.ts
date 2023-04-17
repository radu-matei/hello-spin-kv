import { HttpRequest } from "@fermyon/spin-sdk"

const key = "executionCount";

interface Data {
  count: number,
}

export async function handler(_req: HttpRequest, res: ResponseBuilder) {
  let kv = spinSdk.kv.openDefault();

  // retrieve the data from the key/value store
  let data: Data;
  if (kv.exists(key)) {
    data = JSON.parse(new TextDecoder().decode(kv.get(key)))
  } else {
    data = { count: 0 };
  }

  // increment the counter and set the new value
  data.count += 1;
  kv.set(key, JSON.stringify(data));

  // return the the HTTP response
  res.status(200).body(`Count is: ${data.count}`)
}

