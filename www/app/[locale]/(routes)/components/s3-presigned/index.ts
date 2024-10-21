import { client } from "@/lib/client";
import axios from "axios";

// import {CREATE_PRESIGNED_POST} from '../graphql/user';

export default async (file, type, path) => {
  const bucketInfo = await createPresignedPost(type,path);
  try {
    const preSignedFormData = new FormData();
    preSignedFormData.append("Content-Type", file?.type);
    Object.keys(bucketInfo.fields).forEach(key => {
      preSignedFormData.append(key, bucketInfo.fields[key]);
    });
    preSignedFormData.append("file", file);
    await axios.post(bucketInfo.url, preSignedFormData, {
      validateStatus: status => status >= 200 && status < 300,
    });
    return bucketInfo;
  } catch (error) {
    return bucketInfo;
  }
};

const createPresignedPost = async (type,path) => {
  //@ts-ignore
  const data = (await client.createPresignedPost({ type: type,path: path }))
  .createPresignedPost;
  
  return JSON.parse(data);
};
