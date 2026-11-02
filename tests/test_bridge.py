"""仓库级测试入口：复跑 experiments/event-bridge-v0.1 的离线原型测试。

原型本体与原始测试保留在 experiments/event-bridge-v0.1/（迁移原件，勿改）；
本文件把原型目录加入模块路径后复用其中的 Bridge 实现，验证迁移后仍可运行。
运行：python -m unittest discover -s tests -p 'test_*.py'
"""
import hashlib
import os
import sys
import unittest

sys.path.insert(
    0,
    os.path.join(
        os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
        "experiments",
        "event-bridge-v0.1",
    ),
)

from bridge import Bridge  # noqa: E402


class BridgeRepoTests(unittest.TestCase):
    def test_content_route_and_duplicate(self):
        b = Bridge()
        self.assertTrue(b.submit("t1", "content", "r1", "写出草稿"))
        self.assertFalse(b.submit("t1", "content", "r1", "写出草稿"))
        receipt = b.process("t1")
        self.assertEqual(receipt["worker"], "mock-muse")
        self.assertEqual(receipt["status"], "succeeded")
        self.assertIsNone(b.process("t1"))
        self.assertEqual(b.side_effects, 1)

    def test_code_review_receipt_fingerprint(self):
        b = Bridge()
        b.submit("t2", "code_review", "commit-abc", "代码审核")
        receipt = b.process("t2")
        self.assertEqual(receipt["worker"], "mock-codex")
        self.assertEqual(
            receipt["input_sha256"], hashlib.sha256(b"commit-abc").hexdigest()
        )

    def test_failure_and_approval_gate(self):
        b = Bridge()
        b.submit("f", "content", "v1", "模拟失败")
        b.submit("g", "content", "v1", "需要审批", approval_required=True)
        self.assertEqual(b.process("f", simulate_failure=True)["status"], "failed")
        self.assertEqual(b.process("g")["status"], "approval_required")
        self.assertEqual(b.side_effects, 0)
        self.assertEqual(len(b.watchdog()), 2)
        with self.assertRaises(ValueError):
            b.submit("z", "unavailable", "v1", "不能调用的外部平台")


if __name__ == "__main__":
    unittest.main()
