import json, math
from datetime import datetime, timedelta
offset = 1
h = math.floor(offset)
m = (offset - h) * 60
t = datetime.utcnow() + timedelta(hours=h, minutes=m)
print(json.dumps({"country": "法国 (France)", "capital": "巴黎 (Paris)", "offset": offset, "time": t.strftime("%Y-%m-%d %H:%M:%S")}))
