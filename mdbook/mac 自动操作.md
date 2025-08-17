### 自动操作文件保存地址 `~/Library/Services/`

- 这里的自动操作要点击文件或者文件夹才有 _**快速操作**_ 选项

### 复制路径到剪贴板

- 工作流程收到当前 - 文件或文件夹
- 位于 - 访达.app
- 右边菜单搜索 _**运行 AppleScript**_ 拖动到右边区域，复制下面代码进去

```applescript
on run {input, parameters}

    -- 如果没有选中项
    if input = {} then
        display notification "没有选中文件或文件夹" with title "复制路径失败"
        return
    end if

    -- 拼接所有选中项路径为一行，用空格分隔
    set pathList to ""
    repeat with f in input
        try
            set folderPath to POSIX path of f
            if pathList = "" then
                set pathList to folderPath
            else
                set pathList to pathList & " " & folderPath
            end if
        on error
            display notification "获取路径失败: " & f with title "复制路径失败"
            return
        end try
    end repeat

    -- 检查是否为空
    if pathList = "" then
        display notification "路径内容为空，无法复制" with title "复制路径"
        return
    end if

    -- 尝试复制到剪贴板
    try
        set the clipboard to pathList
        -- 成功则不显示通知
    on error errMsg
        display notification "复制失败: " & errMsg with title "复制路径"
    end try

end run
```

### 打开 iTerm 并运行打开当前目录命令

- 工作流程收到当前 - 文件夹
- 位于 - 访达.app
- 右边菜单搜索 _**运行 Shell 脚本**_，拖动到右边区域
- Shell - /bin/zsh
- 传递输入 - 作为自变量

```bash
# 获取 Finder 传入的文件夹路径
folder="$1"

# 使用 AppleScript 打开 iTerm 并 cd 到目标路径
osascript <<EOF
tell application "iTerm"
    activate
    try
        set newWindow to (create window with default profile)
    on error
        set newWindow to (current window)
    end try
    tell current session of newWindow
        write text "cd " & quoted form of "$folder"
    end tell
end tell
EOF
```

### 用 Visual Studio Code 打开 文件或者文件夹

- 工作流程收到当前 - 文件或文件夹
- 位于 - 访达.app
- 右边菜单搜索 _**运行 Shell 脚本**_，拖动到右边区域
- Shell - /bin/zsh
- 传递输入 - 作为自变量

```bash
#!/bin/zsh

folder="$1"

# 打开 VSCode 并切换到选中的文件夹
open -a "Visual Studio Code" "$folder"
```
