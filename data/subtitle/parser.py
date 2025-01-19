import srt

def extract_sentences(subtitle_path: str) -> list[str]:
    if subtitle_path.endswith('.srt'):
        return extract_srt(subtitle_path)

    return []

def extract_srt(subtitle_path: str) -> list[str]:
    result = []
    with open(subtitle_path, 'r') as file:
        for line in srt.parse(file):
            content = line.content.replace('\n', '')
            result.append(content)

    return result