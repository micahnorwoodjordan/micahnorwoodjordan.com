def is_production_mode(mode: str) -> bool:
    if 'true' in mode.lower():
        return True
    elif 'false' in mode.lower():
        return False
    return False
