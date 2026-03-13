import json, math
from datetime import datetime, timedelta
offset = 0
h = math.floor(offset)
m = (offset - h) * 60
t = datetime.utcnow() + timedelta(hours=h, minutes=m)
print(json.dumps({"country": "英国 (UK)", "capital": "伦敦 (London)", "offset": offset, "time": t.strftime("%Y-%m-%d %H:%M:%S")}))
