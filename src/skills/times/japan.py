import json, math
from datetime import datetime, timedelta
offset = 9
h = math.floor(offset)
m = (offset - h) * 60
t = datetime.utcnow() + timedelta(hours=h, minutes=m)
print(json.dumps({"country": "日本 (Japan)", "capital": "东京 (Tokyo)", "offset": offset, "time": t.strftime("%Y-%m-%d %H:%M:%S")}))
