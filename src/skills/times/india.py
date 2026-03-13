import json, math
from datetime import datetime, timedelta
offset = 5.5
h = math.floor(offset)
m = (offset - h) * 60
t = datetime.utcnow() + timedelta(hours=h, minutes=m)
print(json.dumps({"country": "印度 (India)", "capital": "新德里 (New Delhi)", "offset": offset, "time": t.strftime("%Y-%m-%d %H:%M:%S")}))
