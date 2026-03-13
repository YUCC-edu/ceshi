import json, math
from datetime import datetime, timedelta
offset = 10
h = math.floor(offset)
m = (offset - h) * 60
t = datetime.utcnow() + timedelta(hours=h, minutes=m)
print(json.dumps({"country": "澳大利亚 (Australia)", "capital": "堪培拉 (Canberra)", "offset": offset, "time": t.strftime("%Y-%m-%d %H:%M:%S")}))
