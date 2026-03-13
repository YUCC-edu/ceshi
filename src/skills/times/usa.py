import json, math
from datetime import datetime, timedelta
offset = -5
h = math.floor(offset)
m = (offset - h) * 60
t = datetime.utcnow() + timedelta(hours=h, minutes=m)
print(json.dumps({"country": "美国 (USA)", "capital": "华盛顿 (Washington D.C.)", "offset": offset, "time": t.strftime("%Y-%m-%d %H:%M:%S")}))
