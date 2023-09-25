def test(test):
    assert test == "test"
    assert test != "other_than_test"
    assert type(test) == type(str)
    assert str.lower(test) == test