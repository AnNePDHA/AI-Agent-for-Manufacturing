from langchain_core.chat_history import BaseChatMessageHistory
from langchain_core.messages import BaseMessage, messages_from_dict, messages_to_dict
from pathlib import Path
from typing import List, Optional
import json

class FileChatMessageHistory(BaseChatMessageHistory):
    """Chat message history that stores history in a local file with a message limit."""

    def __init__(
        self,
        file_path: str,
        *,
        encoding: Optional[str] = None,
        ensure_ascii: bool = True,
        message_limit: int = 2
    ) -> None:
        """Initialize the file path for the chat history.
        Args:
            file_path: The path to the local file to store the chat history.
            encoding: The encoding to use for file operations. Defaults to None.
            ensure_ascii: If True, escape non-ASCII in JSON. Defaults to True.
            message_limit: Maximum number of messages to keep. Defaults to 1.
        """
        if message_limit < 1:
            raise ValueError("message_limit must be at least 1")
            
        self.file_path = Path(file_path)
        self.encoding = encoding
        self.ensure_ascii = ensure_ascii
        self.message_limit = message_limit

        # Initialize empty file if it doesn't exist
        if not self.file_path.exists():
            self._save_messages([])

    def _save_messages(self, messages: List[dict]) -> None:
        """Helper method to save messages to file"""
        self.file_path.write_text(
            json.dumps(messages, ensure_ascii=self.ensure_ascii),
            # json.dumps([]),
            encoding=self.encoding
        )

    def _load_messages(self) -> List[dict]:
        """Helper method to load messages from file"""
        content = self.file_path.read_text(encoding=self.encoding)
        return json.loads(content) if content else []

    @property
    def messages(self) -> List[BaseMessage]:
        """Retrieve the messages from the local file, respecting the message limit"""
        raw_messages = self._load_messages()
        # Always keep only the most recent messages up to the limit
        limited_messages = raw_messages[-self.message_limit:]
        return messages_from_dict(limited_messages)

    def add_message(self, message: BaseMessage) -> None:
        """Append the message to the record in the local file, maintaining the message limit"""
        current_messages = self._load_messages()
        current_messages.append(messages_to_dict([message])[0])
        
        # Keep only the most recent messages based on the limit
        limited_messages = current_messages[-self.message_limit:]
        self._save_messages(limited_messages)

    def clear(self) -> None:
        """Clear session memory from the local file"""
        self._save_messages([])