import UUID
from cassandra.cqlengine import columns
from cassandra.cqlengine.models import Model


class User:
    email columns.Text(primary_key=True)
    user_id = columns.UUID(primary_key=True, default=uuid.uuid1)
    password = columns.Text()
