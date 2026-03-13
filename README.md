# 世界首都时间获取系统 (World Capital Time Fetcher)

**项目目的：这个skill项目的目的是让用户快速知晓全世界各地首都的时间，一次提问，所有python文件一次性运行，给出结果。**

本项目是一个基于 React、Express 和 Python 构建的全栈应用，用于实时获取并展示世界上主要国家首都的当前时间。同时，**本项目已完美适配 OpenClaw 智能体框架**，可作为独立技能被调用。

## 功能特点
- **一键获取**：一次请求即可触发所有时间计算脚本，瞬间获取全球时间。
- **OpenClaw 适配**：提供标准的 `skill.json` 清单文件和统一的 Python 入口点 `src/skills/main.py`，供大模型/智能体直接调用。
- **多语言混合架构**：前端使用 React 构建现代化的用户界面，后端使用 Node.js (Express) 提供 API 服务，核心的时间计算逻辑由 Python 脚本处理。
- **独立脚本执行**：每个国家首都的时间计算都由 `src/skills/times/` 目录下独立的 Python 脚本（如 `china.py`, `usa.py` 等）分别实现。
- **并发处理**：后端 API 并发调用多个 Python 脚本，汇总结果后一次性返回给前端，提高响应效率。
- **基础计算技能**：包含一个用于演示基础逻辑的 Python 脚本 `calculate.py`。

## OpenClaw 调用说明
智能体框架（如 OpenClaw）可以通过执行以下命令来调用此技能：
```bash
python src/skills/main.py
```
该命令会一次性运行所有国家的 Python 脚本，并将汇总后的时间数据以标准 JSON 数组的形式输出到 `stdout`。

## 项目结构
- `skill.json`: OpenClaw 技能清单文件。
- `src/skills/main.py`: OpenClaw 调用的统一 Python 入口脚本。
- `src/App.tsx`: React 前端界面，负责展示世界时钟仪表板。
- `server.ts`: Express 后端服务器，提供 `/api/times` 接口。
- `src/skills/times/*.py`: 负责计算各个国家首都时间的独立 Python 脚本。
- `src/skills/calculate.py`: 基础的相等性计算脚本 (`1 == 1`)。

## 运行机制
当用户在前端点击“刷新时间”时，React 会向后端的 `/api/times` 发起请求。Express 服务器会读取 `src/skills/times/` 目录，并使用 `child_process` 并发执行所有的 Python 脚本。Python 脚本计算出带有 UTC 偏移量的当地时间并以 JSON 格式输出，后端将这些 JSON 汇总后返回给前端进行渲染。
