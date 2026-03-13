# 技能文档 (Skills Documentation)

本项目包含两个主要的 Python 技能模块，位于 `src/skills/` 目录下。本项目已完全适配 **OpenClaw** 智能体框架。

## 技能 1：世界首都时间计算 (World Capital Times)

**核心目的:** 这个skill项目的目的是让用户快速知晓全世界各地首都的时间，一次提问，所有python文件一次性运行，给出结果。

**OpenClaw 入口点:** `python src/skills/main.py`
**技能清单:** `skill.json`
**目录:** `src/skills/times/`
**描述:** 该技能由多个独立的 Python 脚本组成（如 `china.py`, `japan.py`, `uk.py` 等），每个脚本负责计算特定国家首都的当前时间。

### OpenClaw 工作原理
1. OpenClaw 读取 `skill.json` 获取技能元数据。
2. OpenClaw 执行入口点命令 `python src/skills/main.py`。
3. `main.py` 脚本会自动遍历 `src/skills/times/` 目录，**一次性执行**所有的 Python 脚本。
4. 每个子脚本获取当前的 UTC 时间，并根据硬编码的偏移量计算当地时间。
5. `main.py` 收集所有子脚本的 JSON 输出，汇总成一个 JSON 数组，并打印到标准输出 (`stdout`)，供 OpenClaw 解析。

### 输出格式示例
```json
{
  "country": "中国 (China)",
  "capital": "北京 (Beijing)",
  "offset": 8,
  "time": "2026-03-13 10:30:00"
}
```

## 技能 2：基础逻辑验证 (Basic Calculation)

**文件:** `src/skills/calculate.py`
**描述:** 一个简单的 Python 脚本，用于验证基础的数学/逻辑相等性。

### 功能
- 计算表达式 `1 == 1` 的布尔值。
- 打印结果 `1 == 1 is True`。
- 返回布尔值 `True`。
