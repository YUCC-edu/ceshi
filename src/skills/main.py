import os
import subprocess
import json
import sys

def main():
    """
    OpenClaw 技能入口点。
    一次性并发/顺序执行 times 目录下的所有 Python 脚本，并汇总结果输出。
    """
    current_dir = os.path.dirname(os.path.abspath(__file__))
    times_dir = os.path.join(current_dir, 'times')
    results = []
    
    if not os.path.exists(times_dir):
        print(json.dumps({"error": "times directory not found"}))
        return

    # 遍历并执行所有的 python 脚本
    for filename in os.listdir(times_dir):
        if filename.endswith('.py'):
            script_path = os.path.join(times_dir, filename)
            try:
                # 执行子脚本并捕获输出
                result = subprocess.run([sys.executable, script_path], capture_output=True, text=True, check=True)
                # 解析子脚本的 JSON 输出
                data = json.loads(result.stdout.strip())
                results.append(data)
            except Exception as e:
                results.append({"error": f"Failed to execute {filename}: {str(e)}"})
    
    # 将汇总的结果以 JSON 格式打印到标准输出，供 OpenClaw 读取
    print(json.dumps(results, ensure_ascii=False, indent=2))

if __name__ == "__main__":
    main()
