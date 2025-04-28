import re

def process_text(input_string: str) -> str:
    # Regular expression to match triple-quoted blocks (using DOTALL for multiline matching)
    pattern = r'"""(.*?)"""'
    is_first_block = True

    def replacer(match):
        nonlocal is_first_block
        if is_first_block:
            is_first_block = False
            # Remove the entire first triple-quoted block.
            return ''
        else:
            return match.group(0)
    # Replace the matched triple-quoted blocks using the replacer function.
    processed = re.sub(pattern, replacer, input_string, flags=re.DOTALL)
    return processed

# Example usage:
if __name__ == "__main__":
    input_string = '''"""This is the first sentence. Here is the rest of the first block."""
Some other text outside of triple quotes.
"""Second block remains unchanged."""
'''
    result = process_text(input_string)
    print(result)
