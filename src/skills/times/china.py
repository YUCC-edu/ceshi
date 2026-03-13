import json, math
from datetime import datetime, timedelta
offset = 8
h = math.floor(offset)
m = (offset - h) * 60
t = datetime.utcnow() + timedelta(hours=h, minutes=m)
print(json.dumps({"country": "中国 (China)", "capital": "北京 (Beijing)", "offset": offset, "time": t.strftime("%Y-%m-%d %H:%M:%S")}))
