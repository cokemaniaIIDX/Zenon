from google.cloud import datastore

def create_client(project_id):
  return datastore.Client(project_id)