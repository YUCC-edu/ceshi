import json, math
from datetime import datetime, timedelta
offset = -3
h = math.floor(offset)
m = (offset - h) * 60
t = datetime.utcnow() + timedelta(hours=h, minutes=m)
print(json.dumps({"country": "巴西 (Brazil)", "capital": "巴西利亚 (Brasilia)", "offset": offset, "time": t.strftime("%Y-%m-%d %H:%M:%S")}))
