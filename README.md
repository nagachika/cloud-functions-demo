# What's this

Practice for Google Cloud Functions.

# How to deploy

## Prerequite

- Enable Cloud Functions API on Developers Console.
- `gcloud components update alpha`

## HTTP Trigger

```
gcloud alpha functions deploy hello-world --bucket SOURCE_BUCKET_NAME --trigger-http
```

## GCS Object Change Notification Trigger

```
gcloud alpha functions deploy gcsocr --bucket SOURCE_BUCKET_NAME --trigger-gs-uri gs://TARGET_BUCKET_NAME
```
